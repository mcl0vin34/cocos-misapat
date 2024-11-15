import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("ProfileModal")
export class ProfileModal extends Component {
  @property(Node)
  avatarIcon: Node | null = null; // Узел иконки аватара

  @property(Node)
  profileModal: Node | null = null; // Узел модального окна ProfileModal

  @property(Node)
  closeButton: Node | null = null; // Узел кнопки закрытия (крестика)

  onLoad() {
    // Изначально скрываем модальное окно
    if (this.profileModal) {
      this.profileModal.active = false;
    }

    // Назначаем обработчик события для иконки аватара, чтобы открыть модальное окно
    if (this.avatarIcon) {
      this.avatarIcon.on(Node.EventType.TOUCH_END, this.showModal, this);
    }

    // Назначаем обработчик события для кнопки закрытия (крестика) внутри модального окна
    if (this.closeButton) {
      this.closeButton.on(Node.EventType.TOUCH_END, this.hideModal, this);
    }
  }

  showModal() {
    // Показываем модальное окно
    if (this.profileModal) {
      this.profileModal.active = true;
    }
  }

  hideModal() {
    // Скрываем модальное окно
    if (this.profileModal) {
      this.profileModal.active = false;
    }
  }
}
