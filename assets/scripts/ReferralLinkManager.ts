import { _decorator, Component, Node, Label, Vec3, Color, tween } from "cc";
import { SocketManager } from "./SocketManager";
const { ccclass, property } = _decorator;

@ccclass("ReferralLinkManager")
export class ReferralLinkManager extends Component {
  @property(Node)
  copyLinkNode: Node = null;

  @property(Node)
  inviteFriendNode: Node = null;

  @property(Label)
  referralLinkLabel: Label = null;

  @property(Label)
  copyNotificationLabel: Label = null;

  private referralLink: string = "";

  @property
  animationDuration: number = 1.5;

  @property
  moveUpDistance: number = 300;

  private initialPosition: Vec3 = new Vec3();

  start() {
    if (!this.copyLinkNode) {
      console.error("copyLinkNode не назначен в ReferralLinkManager.");
    }
    if (!this.inviteFriendNode) {
      console.error("inviteFriendNode не назначен в ReferralLinkManager.");
    }
    if (!this.referralLinkLabel) {
      console.error("referralLinkLabel не назначен в ReferralLinkManager.");
    }
    if (!this.copyNotificationLabel) {
      console.error("copyNotificationLabel не назначен в ReferralLinkManager.");
    }

    // Генерируем реферальную ссылку при старте
    this.generateReferralLink();

    // Назначаем обработчики событий
    if (this.copyLinkNode) {
      this.copyLinkNode.on(
        Node.EventType.TOUCH_END,
        this.onCopyLinkClicked,
        this
      );
      this.copyLinkNode.active = true;
    }

    if (this.inviteFriendNode) {
      this.inviteFriendNode.on(
        Node.EventType.TOUCH_END,
        this.onInviteFriendClicked,
        this
      );
    }

    if (this.copyNotificationLabel) {
      this.copyNotificationLabel.node.active = false;
      this.initialPosition = this.copyNotificationLabel.node.position.clone();
    }
  }

  generateReferralLink() {
    const userId = SocketManager.instance?.getUserId() || 230230230; // Используйте реальный userId или моковые данные
    console.log("User ID:", userId);

    if (!userId) {
      console.error("userId не установлен.");
      return;
    }

    this.referralLink = `https://t.me/misapatStage_bot?startapp=refId${userId}`;
    if (this.referralLinkLabel) {
      this.referralLinkLabel.string = this.referralLink;
    }
    console.log(`Реферальная ссылка создана: ${this.referralLink}`);
  }

  async onCopyLinkClicked() {
    console.log("onCopyLinkClicked called");
    if (this.copyNotificationLabel) {
      this.copyNotificationLabel.node.active = true;
      this.copyNotificationLabel.color = new Color(255, 255, 255, 255);
      this.copyNotificationLabel.node.setPosition(this.initialPosition.clone());

      tween(this.copyNotificationLabel)
        .to(this.animationDuration, { color: new Color(255, 255, 255, 0) })
        .start();

      tween(this.copyNotificationLabel.node)
        .by(this.animationDuration, {
          position: new Vec3(0, this.moveUpDistance, 0),
        })
        .call(() => {
          this.copyNotificationLabel.node.active = false;
          this.copyNotificationLabel.color = new Color(255, 255, 255, 255);
          this.copyNotificationLabel.node.setPosition(
            this.initialPosition.clone()
          );
        })
        .start();
    }

    if (!this.referralLink) {
      console.warn("Реферальная ссылка не создана.");
      return;
    }

    try {
      await navigator.clipboard.writeText(this.referralLink);
      console.log("Реферальная ссылка скопирована в буфер обмена.");
    } catch (err) {
      console.error("Не удалось скопировать ссылку: ", err);
    }
  }

  onInviteFriendClicked() {
    console.log("onInviteFriendClicked called");
    if (!this.referralLink) {
      console.warn("Реферальная ссылка не создана.");
      return;
    }

    const shareReferralLinkText = "Тапай и зарабатывай!";
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      this.referralLink
    )}&text=${encodeURIComponent(shareReferralLinkText)}`;

    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.openTelegramLink) {
      console.log("Используем tg.openTelegramLink для открытия ссылки");
      tg.openTelegramLink(shareUrl);
    } else {
      console.warn(
        "Не удалось открыть Telegram для совместного использования."
      );
      // Попробуем открыть ссылку в браузере
      window.open(shareUrl, "_blank");
    }
  }
}
