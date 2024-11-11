// assets/scripts/Referral/ReferralLinkManager.ts

import { _decorator, Component, Node, Label, Vec3, Color, tween } from "cc";
import { SocketManager } from "./SocketManager"; // Импортируйте SocketManager
const { ccclass, property } = _decorator;

@ccclass("ReferralLinkManager")
export class ReferralLinkManager extends Component {
  @property(Node)
  generateLinkNode: Node = null; // Нода для создания ссылки (если нужна)

  @property(Node)
  copyLinkNode: Node = null; // Нода для копирования ссылки

  @property(Label)
  referralLinkLabel: Label = null; // Метка для отображения ссылки

  @property(Label)
  copyNotificationLabel: Label = null; // Метка для уведомления о копировании

  private referralLink: string = "";

  // Параметры анимации
  @property
  animationDuration: number = 1.5; // Продолжительность анимации в секундах

  @property
  moveUpDistance: number = 300; // Расстояние, на которое уведомление будет подниматься

  private initialPosition: Vec3 = new Vec3();

  start() {
    // Проверка наличия всех нод
    if (!this.copyLinkNode) {
      console.error("copyLinkNode не назначен в ReferralLinkManager.");
    }
    if (!this.referralLinkLabel) {
      console.error("referralLinkLabel не назначен в ReferralLinkManager.");
    }
    if (!this.copyNotificationLabel) {
      console.error("copyNotificationLabel не назначен в ReferralLinkManager.");
    }

    // Генерируем ссылку автоматически при старте
    this.generateReferralLink();

    // Назначаем обработчик нажатия на ноду "Копировать ссылку"
    if (this.copyLinkNode) {
      this.copyLinkNode.on(
        Node.EventType.TOUCH_END,
        this.onCopyLinkClicked,
        this
      );
      this.copyLinkNode.active = true; // Сделать кнопку копирования всегда видимой
    }

    // Инициализируем уведомление как скрытое и сохраняем начальную позицию
    if (this.copyNotificationLabel) {
      this.copyNotificationLabel.node.active = false; // Скрыть уведомление по умолчанию
      this.initialPosition = this.copyNotificationLabel.node.position.clone();
    }

    // Если у вас всё ещё есть кнопка "Создать ссылку" и она нужна:
    if (this.generateLinkNode) {
      this.generateLinkNode.on(
        Node.EventType.TOUCH_END,
        this.onGenerateLinkClicked,
        this
      );
      // Опционально: можно скрыть кнопку, если ссылка генерируется автоматически
      // this.generateLinkNode.active = false;
    }
  }

  /**
   * Генерирует реферальную ссылку автоматически при старте
   */
  generateReferralLink() {
    if (!SocketManager.instance) {
      console.error("SocketManager не инициализирован.");
      return;
    }

    const userId = SocketManager.instance.getUserId();
    if (!userId) {
      console.error("userId не установлен в SocketManager.");
      return;
    }

    this.referralLink = this.getReferralLink(userId);
    this.referralLinkLabel.string = this.referralLink;
    console.log(`Реферальная ссылка создана: ${this.referralLink}`);
  }

  /**
   * Обработчик нажатия на ноду "Создать ссылку"
   * (Если необходимо оставить возможность генерации ссылки вручную)
   */
  onGenerateLinkClicked() {
    this.generateReferralLink();
  }

  /**
   * Генерирует реферальную ссылку на основе user_id
   * @param userId ID пользователя
   * @returns Реферальная ссылка
   */
  getReferralLink(userId: number): string {
    return `https://t.me/misapatStage_bot?startapp=refId${userId}`;
  }

  /**
   * Обработчик нажатия на ноду "Копировать ссылку"
   */
  async onCopyLinkClicked() {
    // Запускаем анимацию уведомления сразу при нажатии на кнопку
    if (this.copyNotificationLabel) {
      this.copyNotificationLabel.node.active = true;

      // Убедимся, что цвет и позиция инициализированы правильно
      this.copyNotificationLabel.color = new Color(255, 255, 255, 255);
      this.copyNotificationLabel.node.setPosition(this.initialPosition.clone());

      // Анимация для цвета: плавное исчезновение
      tween(this.copyNotificationLabel)
        .to(this.animationDuration, { color: new Color(255, 255, 255, 0) })
        .start();

      // Анимация для позиции: подъем вверх
      tween(this.copyNotificationLabel.node)
        .by(this.animationDuration, {
          position: new Vec3(0, this.moveUpDistance, 0),
        })
        .call(() => {
          this.copyNotificationLabel.node.active = false; // Скрыть уведомление после анимации
          // Восстановить первоначальный цвет и позицию для будущих уведомлений
          this.copyNotificationLabel.color = new Color(255, 255, 255, 255);
          this.copyNotificationLabel.node.setPosition(
            this.initialPosition.clone()
          );
        })
        .start();
    }

    // Выполняем копирование ссылки
    if (!this.referralLink) {
      console.warn("Реферальная ссылка не создана.");
      return;
    }

    try {
      await navigator.clipboard.writeText(this.referralLink);
      console.log("Реферальная ссылка скопирована в буфер обмена.");
    } catch (err) {
      console.error("Не удалось скопировать ссылку: ", err);
      // Можно добавить уведомление об ошибке, если необходимо
    }
  }
}
