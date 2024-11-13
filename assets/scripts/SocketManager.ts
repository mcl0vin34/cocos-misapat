// cocos-project/assets/scripts/SocketManager.ts

import { _decorator, Component, Label, Color, ProgressBar, Node } from "cc";
import { IncomeManager } from "./IncomeManager";
import { PassiveIncomeModal } from "./PassiveIncomeModal";
declare const io: any;

const { ccclass, property } = _decorator;

@ccclass("SocketManager")
export class SocketManager extends Component {
  private static _instance: SocketManager = null;

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
  boostsLabel: Label = null;

  @property(IncomeManager)
  incomeManager: IncomeManager = null;

  @property(PassiveIncomeModal)
  passiveIncomeModal: PassiveIncomeModal = null;

  private socket: any = null;
  private userId: number = null;
  private userData: any = null;
  private maxEnergy: number = 2000;
  private currentEnergy: number = 0;
  private currentBoosts: number = 0;
  private maxBoosts: number = 6;
  private currentCoins: number = 0;

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

    if (!this.incomeManager) {
      const incomeManagerNode =
        this.node.scene.getChildByName("IncomeManagerNode");
      if (incomeManagerNode) {
        this.incomeManager = incomeManagerNode.getComponent(IncomeManager);
      } else {
        console.warn("IncomeManager не найден в сцене.");
      }
    }

    this.initializeUser();

    this.showUserInfo(false);
  }

  onDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
    if (SocketManager._instance === this) {
      SocketManager._instance = null;
    }
  }

  /**
   * Динамически загружает Telegram Web Apps SDK
   */
  private loadTelegramSDK(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).Telegram) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-web-app.js";
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject(new Error("Не удалось загрузить Telegram Web Apps SDK."));
      };
      document.head.appendChild(script);
    });
  }

  /**
   * Инициализирует пользователя, получая данные из Telegram WebApp API или используя моковые данные
   */
  async initializeUser() {
    try {
      await this.loadTelegramSDK();

      const tg = (window as any).Telegram?.WebApp;

      if (tg) {
        console.log("Telegram WebApp API доступен");
        console.log(tg.initDataUnsafe);

        // Ждём, пока Telegram WebApp будет готов
        await new Promise<void>((resolve) => {
          tg.ready();
          resolve();
        });

        console.log("tg.initDataUnsafe после готовности:", tg.initDataUnsafe);

        if (tg.initDataUnsafe?.user?.id) {
          const userData = {
            id: tg.initDataUnsafe.user.id,
            username: tg.initDataUnsafe.user.username,
            first_name: tg.initDataUnsafe.user.first_name,
            last_name: tg.initDataUnsafe.user.last_name || "",
            language_code: tg.initDataUnsafe.user.language_code || "",
            is_premium: tg.initDataUnsafe.user.is_premium || false,
            photo_url: tg.initDataUnsafe.user.photo_url || "",
            full_name: `${tg.initDataUnsafe.user.first_name} ${
              tg.initDataUnsafe.user.last_name || ""
            }`,
          };

          console.log("Данные пользователя Telegram:", userData);

          this.userId = userData.id;
          this.userData = userData;
        } else {
          console.warn("Данные пользователя не найдены в tg.initDataUnsafe.");
          this.useMockData();
        }
      } else {
        console.warn("Telegram WebApp недоступен. Используем моковые данные.");
        this.useMockData();
      }

      // Продолжаем инициализацию
      await this.createOrUpdateUser(this.userData);
      await this.fetchInitialData();
      this.autoConnect();
      this.showUserInfo(true);
      this.checkPassiveIncome();

      // Обработка реферальных параметров
      if (tg && tg.initDataUnsafe?.start_param) {
        const startParam = tg.initDataUnsafe.start_param;
        console.log("start_param:", startParam);

        if (startParam.startsWith("refId")) {
          const referrerId = startParam.replace("refId", "");
          const referralId = this.userId;

          if (
            referralId &&
            referrerId &&
            referralId.toString() !== referrerId
          ) {
            try {
              const response = await fetch(
                `https://dev.simatap.ru/api/referrals?referrer_id=${referrerId}&referral_id=${referralId}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({}),
                }
              );

              if (response.ok) {
                console.log("Реферал успешно зарегистрирован.");
              } else {
                const data = await response.json();
                if (data.message === "Такая запись о реферале уже существует") {
                  console.log("Реферал уже существует.");
                } else {
                  console.error(
                    "Ошибка при регистрации реферала:",
                    data.message
                  );
                }
              }
            } catch (error) {
              console.error("Ошибка при регистрации реферала:", error);
            }
          }
        }
      }
    } catch (error) {
      console.error("Ошибка при инициализации пользователя:", error);
    }
  }

  private useMockData() {
    const userData = {
      id: 230230230,
      username: "230 bro's",
      first_name: "madesta",
      last_name: "",
      language_code: "en",
      is_premium: false,
      photo_url: "",
      full_name: "Test User",
    };
    this.userId = userData.id;
    this.userData = userData;
  }

  /**
   * Создает или обновляет пользователя на сервере
   * @param userData Данные пользователя
   */
  async createOrUpdateUser(userData: any) {
    try {
      const queryParams = new URLSearchParams({
        id: userData.id.toString(),
        username: userData.username || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
      });

      const postResponse = await fetch(
        `https://dev.simatap.ru/api/users?${queryParams.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!postResponse.ok) {
        throw new Error(
          `Ошибка при отправке POST запроса: ${postResponse.statusText}`
        );
      }

      console.log("Пользователь успешно создан или обновлен.");
    } catch (error) {
      console.warn("Ошибка при создании или обновлении пользователя.", error);
    }
  }

  /**
   * Автоматически подключается к серверу Socket.IO с userId
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
      });

      this.socket.on("disconnect", () => {
        this.showMessage("Отключено от сервера.", "danger");
        this.showUserInfo(false);
      });

      this.socket.on("energyUpdated", (data: any) => {
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

      // Обработчик события обновления монет
      this.socket.on("coinsUpdated", (data: any) => {
        if (data.coins !== undefined) {
          this.updateCoins(Math.round(data.coins));
        } else {
          console.warn("coinsUpdated event received, but coins is undefined.");
        }
      });

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
        if (data.newEnergyValue !== undefined) {
          this.updateEnergy(Math.round(data.newEnergyValue));
        }
      });

      // Обработчик ошибки при активации буста
      this.socket.on("boostError", (data: any) => {
        console.error("Ошибка активации буста:", data.message);
      });
    } catch (error) {
      this.showMessage("Ошибка подключения к серверу.", "danger");
      console.error("Socket connection error:", error);
    }
  }

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

      if (data.energy_left !== undefined) {
        this.updateEnergy(Math.round(data.energy_left));
        console.log(`Initial energy fetched: ${Math.round(data.energy_left)}`);
      } else {
        console.warn("Energy data not found in API response.");
      }

      if (data.boosts_left !== undefined) {
        this.updateBoosts(data.boosts_left);
        console.log(`Initial boosts fetched: ${data.boosts_left}`);
      } else {
        console.warn("Boosts data not found in API response.");
      }

      await this.fetchTotalCoins();
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  }

  /**
   * Получает общее количество монет пользователя
   */
  async fetchTotalCoins() {
    try {
      const response = await fetch(
        `https://dev.simatap.ru/api/totalCoins/${this.userId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.coins !== undefined) {
        this.updateCoins(Math.round(data.coins));
        console.log(`Total coins fetched: ${Math.round(data.coins)}`);
      } else {
        console.warn("Coins data not found in API response.");
      }
    } catch (error) {
      console.warn(
        "Ошибка при получении количества монет. Используем значение по умолчанию 0.",
        error
      );
      this.updateCoins(0);
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
    }
  }
}
