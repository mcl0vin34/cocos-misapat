// assets/scripts/LeaderBoard/LeaderBoardPage.ts

import {
  _decorator,
  Component,
  ScrollView,
  Prefab,
  instantiate,
  Label,
  Color,
} from "cc";
import { SocketManager } from "./SocketManager"; // Импортируем SocketManager
const { ccclass, property } = _decorator;

// Интерфейс для Лидера
interface LeaderboardUser {
  rank: number;
  username: string;
  coins: number;
  isCurrentUser: boolean;
}

// Интерфейс для ответа API
interface ApiResponse {
  top50: LeaderboardUser[];
  currentUser: LeaderboardUser | null;
}

@ccclass("LeaderBoardPage")
export class LeaderBoardPage extends Component {
  @property(ScrollView)
  scrollView: ScrollView = null;

  @property(Prefab)
  leaderItemPrefab: Prefab = null;

  // Удаляем свойство totalLeadersLabel
  // @property(Label)
  // totalLeadersLabel: Label = null;

  // Добавляем новые свойства для текущего игрока
  @property(Label)
  currentRankLabel: Label = null;

  @property(Label)
  currentUsernameLabel: Label = null;

  @property(Label)
  currentCoinsLabel: Label = null;

  @property
  apiBaseUrl: string = "https://dev.simatap.ru/api/users/leaders";

  // Удаляем локальную переменную userId
  // private userId: number = 777270195; // Замените на актуальный userId или получите его из других источников

  start() {
    // Проверяем, инициализирован ли SocketManager
    if (!SocketManager.instance) {
      console.error("SocketManager не инициализирован.");
      // Можно показать сообщение об ошибке пользователю
      return;
    }

    // Получаем userId из SocketManager
    const userId = SocketManager.instance.getUserId();
    if (!userId) {
      console.error("userId не установлен в SocketManager.");
      // Можно показать сообщение об ошибке пользователю
      return;
    }

    this.fetchLeaders();
  }

  /**
   * Получает список лидеров из API
   */
  async fetchLeaders() {
    // Получаем userId из SocketManager
    const userId = SocketManager.instance.getUserId();
    if (!userId) {
      console.error("userId не установлен в SocketManager.");
      // Можно показать сообщение об ошибке пользователю
      return;
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}?userId=${userId}`);
      if (!response.ok) {
        if (response.status === 404) {
          // Если топ-лидеров нет, можно скрыть список или показать сообщение
          console.warn("Топ-лидеров пока нет.");
          return;
        }
        throw new Error("Network response was not ok");
      }
      const data: ApiResponse = await response.json();
      console.log("Fetched leaderboard data:", data);

      // Убираем строку с общим количеством лидеров
      // this.totalLeadersLabel.string = `Топ-50 лидеров: ${data.top50.length}`;

      this.populateLeadersList(data.top50);

      // Отображаем информацию о текущем игроке
      if (data.currentUser) {
        this.displayCurrentUser(data.currentUser);
      }

      // Прокрутка ScrollView к началу после заполнения списка
      if (this.scrollView) {
        this.scrollView.scrollToTop(0, false);
        // Альтернативный способ:
        // this.scrollView.content.setPosition(new Vec3(0, 0, 0));
      }
    } catch (error) {
      console.error("Ошибка при загрузке списка лидеров:", error);
      // Убираем строку с общим количеством лидеров и показываем ошибку
      // if (this.totalLeadersLabel) {
      //     this.totalLeadersLabel.string = 'Не удалось загрузить список лидеров.';
      // }
    }
  }

  /**
   * Заполняет ScrollView списком лидеров
   * @param leaders Список лидеров
   */
  populateLeadersList(leaders: LeaderboardUser[]) {
    const content = this.scrollView.content;
    console.log("Populating leaderboard list with", leaders.length, "leaders.");

    // Очистить предыдущие элементы
    content.removeAllChildren();

    leaders.forEach((leader, index) => {
      console.log(`Adding leader ${leader.rank}:`, leader);
      const leaderItem = instantiate(this.leaderItemPrefab);
      leaderItem.parent = content;

      // Получить все Label компоненты в leaderItem
      const labels = leaderItem.getComponentsInChildren(Label);
      console.log(`Found ${labels.length} Label components in LeaderItem.`);

      let numberLabel: Label = null;
      let usernameLabel: Label = null;
      let coinsLabel: Label = null;

      labels.forEach((label) => {
        const nodeName = label.node.name;
        if (nodeName === "NumberLabel") {
          // Используем NumberLabel
          numberLabel = label;
        } else if (nodeName === "UsernameLabel") {
          usernameLabel = label;
        } else if (nodeName === "CoinsLabel") {
          coinsLabel = label;
        }
      });

      if (numberLabel && usernameLabel && coinsLabel) {
        numberLabel.string = `#${leader.rank}`;
        usernameLabel.string = leader.username;
        coinsLabel.string = this.formatCoins(leader.coins);
        console.log(
          `Set Number: ${leader.rank}, Username: ${leader.username}, Coins: ${leader.coins}`
        );
      } else {
        console.warn("Не удалось найти один из Label компонентов в LeaderItem");
        console.log(
          "Найденные Label узлы:",
          labels.map((label) => label.node.name)
        );
      }
    });
  }

  /**
   * Отображает информацию о текущем игроке в отдельных метках
   * @param user Информация о текущем игроке
   */
  displayCurrentUser(user: LeaderboardUser) {
    if (this.currentRankLabel) {
      this.currentRankLabel.string = `#${user.rank}`;
    } else {
      console.warn("currentRankLabel не назначен в LeaderBoardPage.");
    }

    if (this.currentUsernameLabel) {
      this.currentUsernameLabel.string = `${user.username}`;
    } else {
      console.warn("currentUsernameLabel не назначен в LeaderBoardPage.");
    }

    if (this.currentCoinsLabel) {
      this.currentCoinsLabel.string = `${this.formatCoins(user.coins)}`;
    } else {
      console.warn("currentCoinsLabel не назначен в LeaderBoardPage.");
    }
  }

  /**
   * Форматирует количество монет.
   * Если монет >= 1,000,000, отображает в миллионах с буквой "M" без пробела.
   * Иначе, отображает количество монет с разделителями тысяч и округляет до целого числа.
   * @param coins Количество монет
   * @returns Отформатированная строка
   */
  formatCoins(coins: number): string {
    if (coins >= 1_000_000) {
      const millions = Math.round(coins / 1_000_000);
      return `${millions}M`;
    } else {
      return Math.round(coins).toLocaleString("ru-RU"); // Указываем локаль для правильного форматирования
    }
  }
}
