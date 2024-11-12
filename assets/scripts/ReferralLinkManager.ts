// assets/scripts/Referral/ReferralLinkManager.ts

import {
  _decorator,
  Component,
  Node,
  Label,
  Vec3,
  Color,
  tween,
  sys,
} from "cc";
import { SocketManager } from "./SocketManager";
const { ccclass, property } = _decorator;

@ccclass("ReferralLinkManager")
export class ReferralLinkManager extends Component {
  @property(Node)
  generateLinkNode: Node = null;

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

    if (this.generateLinkNode) {
      this.generateLinkNode.on(
        Node.EventType.TOUCH_END,
        this.onGenerateLinkClicked,
        this
      );
    }
  }

  generateReferralLink() {
    if (!SocketManager.instance) {
      console.error("SocketManager не инициализирован.");
      return;
    }

    const userId = SocketManager.instance.getUserId();
    console.log("User ID:", userId);

    if (!userId) {
      console.error("userId не установлен в SocketManager.");
      return;
    }

    this.referralLink = `https://t.me/misapatStage_bot?startapp=refId${userId}`;
    if (this.referralLinkLabel) {
      this.referralLinkLabel.string = this.referralLink;
    }
    console.log(`Реферальная ссылка создана: ${this.referralLink}`);
  }

  onGenerateLinkClicked() {
    console.log("onGenerateLinkClicked called");
    this.generateReferralLink();
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
    console.log("Открываем ссылку:", this.referralLink);

    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.openTelegramLink) {
      console.log("Используем tg.openTelegramLink для открытия ссылки");
      tg.openTelegramLink(this.referralLink);
    } else {
      console.log("Используем sys.openURL для открытия ссылки");
      sys.openURL(this.referralLink);
    }
  }
}
