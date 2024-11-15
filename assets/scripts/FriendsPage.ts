// assets/scripts/FriendsPage.ts

import {
  _decorator,
  Component,
  ScrollView,
  Prefab,
  instantiate,
  Label,
} from "cc";
import { SocketManager } from "./SocketManager"; // Импортируйте SocketManager
const { ccclass, property } = _decorator;

// Интерфейс для Друга
interface Friend {
  username: string;
  coins: number;
}

@ccclass("FriendsPage")
export class FriendsPage extends Component {
  @property(ScrollView)
  scrollView: ScrollView = null;

  @property(Prefab)
  friendItemPrefab: Prefab = null;

  @property(Label)
  totalFriendsLabel: Label = null;

  @property
  apiBaseUrl: string = "https://dev.simatap.ru/api/referrals";

  private hasFetchedFriends: boolean = false; // Флаг, чтобы избежать повторных вызовов

  start() {
    // Убедитесь, что SocketManager инициализирован
    if (!SocketManager.instance) {
      console.error("SocketManager не инициализирован.");
      this.totalFriendsLabel.string = "Ошибка инициализации.";
      return;
    }

    // Подпишитесь на событие завершения инициализации пользователя
    SocketManager.instance.on("userInitialized", this.onUserInitialized, this);

    // Дополнительная проверка на случай, если пользователь уже инициализирован
    const userId = SocketManager.instance.getUserId();
    if (userId) {
      this.fetchFriends();
      this.hasFetchedFriends = true;
    }
  }

  onDestroy() {
    // Отписка от события при уничтожении компонента
    if (SocketManager.instance) {
      SocketManager.instance.off(
        "userInitialized",
        this.onUserInitialized,
        this
      );
    }
  }

  onUserInitialized() {
    if (!this.hasFetchedFriends) {
      this.fetchFriends();
      this.hasFetchedFriends = true;
    }
  }

  async fetchFriends() {
    const userId = SocketManager.instance.getUserId();
    if (!userId) {
      console.error("userId не установлен в SocketManager.");
      this.totalFriendsLabel.string = "Неизвестный пользователь.";
      return;
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}/${userId}`);
      if (!response.ok) {
        if (response.status === 404) {
          this.totalFriendsLabel.string = `У тебя пока нет друзей`;
          return;
        }
        throw new Error("Network response was not ok");
      }
      const friends: Friend[] = await response.json();
      console.log("Fetched friends:", friends);
      this.totalFriendsLabel.string = `У тебя ${friends.length} друзей`;
      this.populateFriendsList(friends);
    } catch (error) {
      console.error("Ошибка при загрузке списка друзей:", error);
      this.totalFriendsLabel.string = "Не удалось загрузить список друзей.";
    }
  }

  populateFriendsList(friends: Friend[]) {
    const content = this.scrollView.content;
    console.log("Populating friends list with", friends.length, "friends.");

    // Очистить предыдущие элементы
    content.removeAllChildren();

    friends.forEach((friend, index) => {
      console.log(`Adding friend ${index + 1}:`, friend);
      const friendItem = instantiate(this.friendItemPrefab);
      friendItem.parent = content;

      // Получить все Label компоненты в friendItem
      const labels = friendItem.getComponentsInChildren(Label);
      console.log(`Found ${labels.length} Label components in FriendItem.`);

      let usernameLabel: Label = null;
      let numberLabel: Label = null;
      let coinsLabel: Label = null;

      labels.forEach((label) => {
        const nodeName = label.node.name;
        if (nodeName === "UsernameLabel") {
          usernameLabel = label;
        } else if (nodeName === "NumberLabel") {
          numberLabel = label;
        } else if (nodeName === "CoinsLabel") {
          coinsLabel = label;
        }
      });

      if (usernameLabel && numberLabel && coinsLabel) {
        usernameLabel.string = friend.username;
        numberLabel.string = `${index + 1}.`;
        coinsLabel.string = this.formatCoins(friend.coins);
        console.log(
          `Set Username: ${friend.username}, Number: ${index + 1}, Coins: ${
            friend.coins
          }`
        );
      } else {
        console.warn("Не удалось найти один из Label компонентов в FriendItem");
        console.log(
          "Найденные Label узлы:",
          labels.map((label) => label.node.name)
        );
      }
    });
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
