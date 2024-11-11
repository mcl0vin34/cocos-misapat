// assets/scripts/SocketManager.ts

import { _decorator, Component, Label, Color, ProgressBar, Node } from "cc";
import { IncomeManager } from "./IncomeManager"; // Убедитесь, что путь корректный
import { PassiveIncomeModal } from "./PassiveIncomeModal"; // Импортируем модальное окно пассивного дохода
declare const io: any; // Глобальная переменная для socket.io

const { ccclass, property } = _decorator;

@ccclass("SocketManager")
export class SocketManager extends Component {
  // Статический экземпляр для Singleton
  private static _instance: SocketManager = null;

  // Геттер для доступа к экземпляру Singleton
  public static get instance(): SocketManager {
    if (!SocketManager._instance) {
      console.error(
        "SocketManager не инициализирован. Убедитесь, что он добавлен на ноду в сцене."
      );
    }
    return SocketManager._instance;
  }

  @property(Label)
  coinsLabel: Label = null;

  @property(ProgressBar)
  energyProgressBar: ProgressBar = null;

  @property(Label)
  energyValueLabel: Label = null;

  @property(Label)
  messagesLabel: Label = null;

  @property(Label)
  boostsLabel: Label = null; // Свойство для отображения количества бустов

  @property(IncomeManager)
  incomeManager: IncomeManager = null; // Ссылка на IncomeManager

  @property(PassiveIncomeModal)
  passiveIncomeModal: PassiveIncomeModal = null; // Ссылка на компонент модального окна

  private socket: any = null;
  private userId: number = 124124124; // Инициализируйте или получите динамически
  private maxEnergy: number = 2000; // Максимальное значение энергии
  private currentEnergy: number = 0; // Текущее значение энергии
  private currentBoosts: number = 0; // Текущее количество бустов
  private maxBoosts: number = 6; // Максимальное количество бустов
  private currentCoins: number = 0; // Текущее количество монет

  onLoad() {
    if (SocketManager._instance && SocketManager._instance !== this) {
      console.warn("SocketManager уже существует. Удаление дубликата.");
      this.node.destroy();
      return;
    }
    SocketManager._instance = this;
  }

  start() {
    if (
      !this.coinsLabel ||
      !this.energyProgressBar ||
      !this.energyValueLabel ||
      !this.messagesLabel ||
      !this.boostsLabel
    ) {
      console.error("Не все необходимые компоненты назначены в SocketManager.");
      return;
    }

    // Если incomeManager не установлен в инспекторе, пытаемся найти его в сцене
    if (!this.incomeManager) {
      const incomeManagerNode =
        this.node.scene.getChildByName("IncomeManagerNode"); // Замените на реальное имя узла
      if (incomeManagerNode) {
        this.incomeManager = incomeManagerNode.getComponent(IncomeManager);
      } else {
        console.warn("IncomeManager не найден в сцене.");
      }
    }

    this.autoConnect();
    this.showUserInfo(false);

    // Проверяем пассивный доход
    this.checkPassiveIncome();
  }

  onDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
    // Очистка экземпляра Singleton при уничтожении
    if (SocketManager._instance === this) {
      SocketManager._instance = null;
    }
  }

  /**
   * Автоматически подключается к серверу Socket.IO с фиксированным userId
   */
  autoConnect() {
    try {
      this.socket = io("https://dev.simatap.ru", {
        transports: ["websocket"],
        secure: true,
        rejectUnauthorized: false,
      });

      this.socket.on("connect", () => {
        this.socket.emit("register", { userId: this.userId });
        this.showUserInfo(true);

        // Получаем начальные данные
        this.fetchInitialData();
      });

      this.socket.on("disconnect", () => {
        this.showMessage("Отключено от сервера.", "danger");
        this.showUserInfo(false);
      });

      this.socket.on("energyUpdated", (data: any) => {
        console.log("Received energyUpdated event:", data);
        if (data.energy_left !== undefined) {
          this.updateEnergy(Math.round(data.energy_left));
        } else {
          console.warn(
            "energyUpdated event received, but energy_left is undefined."
          );
        }
      });

      // Обработчик обновления количества бустов
      this.socket.on("boostsUpdated", (data: any) => {
        console.log("Received boostsUpdated event:", data);
        if (data.boosts_left !== undefined) {
          this.updateBoosts(data.boosts_left);
        } else {
          console.warn(
            "boostsUpdated event received, but boosts_left is undefined."
          );
        }
      });

      // Обработчик события обновления монет (если сервер отправляет такое событие)
      this.socket.on("coinsUpdated", (data: any) => {
        console.log("Received coinsUpdated event:", data);
        if (data.coins !== undefined) {
          this.updateCoins(Math.round(data.coins));
        } else {
          console.warn("coinsUpdated event received, but coins is undefined.");
        }
      });

      // Остальные обработчики событий

      this.socket.on("tapError", (data: any) => {
        this.showMessage(data.message, "warning");
      });

      this.socket.on("registrationError", (data: any) => {
        this.showMessage(data.message, "danger");
        this.showUserInfo(false);
      });

      this.socket.on("connect_error", (error: any) => {
        this.showMessage("Ошибка подключения к серверу.", "danger");
      });

      // Обработчик ответа на активацию буста
      this.socket.on("boostActivated", (data: any) => {
        console.log("Boost activation response:", data);
        // Обновляем энергию, если сервер вернул новое значение
        if (data.newEnergyValue !== undefined) {
          this.updateEnergy(Math.round(data.newEnergyValue));
        }
        // Обновление количества бустов будет обработано через событие 'boostsUpdated'
      });

      // Обработчик ошибки при активации буста
      this.socket.on("boostError", (data: any) => {
        console.error("Ошибка активации буста:", data.message);
        // Ошибки при активации буста будут обработаны в BoostController
      });
    } catch (error) {
      this.showMessage("Ошибка подключения к серверу.", "danger");
      console.error("Socket connection error:", error);
    }
  }

  /**
   * Получает начальные данные с API и обновляет состояние
   */
  async fetchInitialData() {
    try {
      const response = await fetch(
        `https://dev.simatap.ru/api/users/${this.userId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      console.log("API response:", data);

      // Обновляем энергию
      if (data.energy_left !== undefined) {
        this.updateEnergy(Math.round(data.energy_left));
        console.log(`Initial energy fetched: ${Math.round(data.energy_left)}`);
      } else {
        console.warn("Energy data not found in API response.");
      }

      // Обновляем количество бустов
      if (data.boosts_left !== undefined) {
        this.updateBoosts(data.boosts_left);
        console.log(`Initial boosts fetched: ${data.boosts_left}`);
      } else {
        console.warn("Boosts data not found in API response.");
      }

      // Если в ответе есть поле с монетами, обновляем его
      if (data.coins !== undefined) {
        this.updateCoins(Math.round(data.coins));
        console.log(`Initial coins fetched: ${Math.round(data.coins)}`);
      } else {
        console.warn("Coins data not found in API response.");
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  }

  /**
   * Обновляет количество монет и соответствующую метку.
   * @param coins Новое количество монет.
   */
  updateCoins(coins: number) {
    this.currentCoins = coins;
    if (this.coinsLabel) {
      this.coinsLabel.string = this.currentCoins.toLocaleString();
    } else {
      console.warn("coinsLabel не назначен в SocketManager.");
    }
  }

  /**
   * Проверяет и обрабатывает пассивный доход
   */
  async checkPassiveIncome() {
    const income = await this.fetchPassiveIncome();
    if (income > 0) {
      if (this.passiveIncomeModal) {
        this.passiveIncomeModal.show(income);
      } else {
        console.warn("PassiveIncomeModal не назначен в SocketManager.");
      }

      // Обновляем количество монет
      this.currentCoins += income;
      this.updateCoins(this.currentCoins);
    }
  }

  /**
   * Получает пассивный доход с сервера и возвращает его
   */
  async fetchPassiveIncome(): Promise<number> {
    try {
      const response = await fetch(
        `https://dev.simatap.ru/api/passiveIncome?userId=${this.userId}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, response: ${errorText}`
        );
      }
      const data = await response.json();

      console.log("Passive income API response:", data);

      if ("passive_income_earned" in data) {
        const income = Math.round(data.passive_income_earned);
        console.log(`Пассивный доход получен: ${income}`);
        return income;
      } else if ("message" in data) {
        console.log(`Сообщение от сервера: ${data.message}`);
        return 0;
      } else {
        console.warn("Неизвестный формат ответа от сервера:", data);
        return 0;
      }
    } catch (error) {
      console.error("Ошибка при получении пассивного дохода:", error);
      return 0;
    }
  }

  /**
   * Обновляет количество бустов и соответствующую метку.
   * @param boostsLeft Текущее количество оставшихся бустов.
   */
  updateBoosts(boostsLeft: number) {
    this.currentBoosts = boostsLeft;
    if (this.boostsLabel) {
      this.boostsLabel.string = `${this.currentBoosts}/${this.maxBoosts}`;
    } else {
      console.warn("boostsLabel не назначен в SocketManager.");
    }
  }

  /**
   * Обновляет прогресс-бар энергии и текстовую метку.
   * @param currentEnergy Текущее значение энергии.
   */
  updateEnergy(currentEnergy: number) {
    currentEnergy = Math.round(
      Math.max(0, Math.min(this.maxEnergy, currentEnergy))
    );
    this.currentEnergy = currentEnergy;

    console.log("Energy updated:", this.currentEnergy);

    const progress = currentEnergy / this.maxEnergy;
    this.energyProgressBar.progress = progress;

    this.energyValueLabel.string = `${currentEnergy}/${this.maxEnergy}`;
  }

  /**
   * Показывает или скрывает UserInfo
   * @param show Показывать или скрывать
   */
  showUserInfo(show: boolean) {
    if (
      this.coinsLabel &&
      this.energyProgressBar &&
      this.energyValueLabel &&
      this.boostsLabel
    ) {
      this.coinsLabel.node.active = show;
      this.energyProgressBar.node.active = show;
      this.energyValueLabel.node.active = show;
      this.boostsLabel.node.active = show;
    }
  }

  /**
   * Отображает сообщение пользователю
   * @param message Текст сообщения
   * @param type Тип сообщения ('success', 'danger', 'warning', 'info')
   */
  showMessage(message: string, type: string = "info") {
    if (this.messagesLabel) {
      this.messagesLabel.string = message;
      switch (type) {
        case "success":
          this.messagesLabel.node.color = new Color(0, 255, 0);
          break;
        case "danger":
          this.messagesLabel.node.color = new Color(255, 0, 0);
          break;
        case "warning":
          this.messagesLabel.node.color = new Color(255, 165, 0);
          break;
        default:
          this.messagesLabel.node.color = new Color(255, 255, 255);
      }
    }
  }

  /**
   * Возвращает текущее значение энергии
   */
  getCurrentEnergy(): number {
    return this.currentEnergy;
  }

  /**
   * Возвращает текущее количество бустов
   */
  getCurrentBoosts(): number {
    return this.currentBoosts;
  }

  /**
   * Активирует буст
   */
  activateBoost() {
    if (!this.socket || !this.socket.connected || !this.userId) {
      console.error(
        "Не удалось использовать буст: сокет не подключен или userId не установлен."
      );
      return;
    }
    this.socket.emit("useBoost", { userId: this.userId });
    console.log("Буст активирован.");
  }

  /**
   * Обработчик события "tap"
   */
  onTap() {
    console.log("Current energy in onTap:", this.currentEnergy);

    if (!this.userId) {
      this.showMessage("Пользователь не подключен.", "danger");
      return;
    }
    if (this.currentEnergy < 13) {
      this.showMessage("Не хватает энергии для тапа.", "warning");
      return;
    }
    if (this.socket && this.socket.connected) {
      this.socket.emit("tap", { userId: this.userId });
      this.showMessage("Тап отправлен!", "info");
    } else {
      this.showMessage("Соединение с сервером отсутствует.", "danger");
    }
  }

  /**
   * Получает текущий userId
   */
  public getUserId(): number {
    return this.userId;
  }

  /**
   * Устанавливает новый userId
   * @param id Новый ID пользователя
   */
  public setUserId(id: number) {
    this.userId = id;
    if (this.socket && this.socket.connected) {
      this.socket.emit("register", { userId: this.userId });
      // Дополнительные действия при изменении userId, если необходимо
    }
  }

  /**
   * Инициализирует пользователя (например, после логина)
   * @param id ID пользователя
   */
  public initializeUser(id: number) {
    this.setUserId(id);
    // Другие действия по инициализации пользователя
  }
}
