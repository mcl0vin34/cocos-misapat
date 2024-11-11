// assets/scripts/PassiveIncomeModal.ts

import { _decorator, Component, Node, Label, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PassiveIncomeModal')
export class PassiveIncomeModal extends Component {
    @property(Label)
    incomeLabel: Label = null; // Метка для отображения количества монет

    @property(Node)
    modalNode: Node = null; // Узел модального окна

    @property(Node)
    closeNode: Node = null; // Узел со спрайтом для закрытия окна

    start() {
        // Скрываем модальное окно при старте
        if (this.modalNode) {
            this.modalNode.active = false;
        }

        // Добавляем обработчик нажатия на узел со спрайтом
        if (this.closeNode) {
            this.closeNode.on(Node.EventType.TOUCH_END, this.onCloseClicked, this);
        } else {
            console.warn('closeNode не назначен в PassiveIncomeModal.');
        }
    }

    /**
     * Показывает модальное окно с информацией о пассивном доходе
     * @param income Количество заработанных монет
     */
    show(income: number) {
        if (this.incomeLabel && this.modalNode) {
            this.incomeLabel.string = `+ ${income}`;
            this.modalNode.active = true;
        }
    }

    /**
     * Закрывает модальное окно
     */
    hide() {
        if (this.modalNode) {
            this.modalNode.active = false;
        }
    }

    /**
     * Обработчик нажатия на узел со спрайтом для закрытия модального окна
     */
    onCloseClicked(event: EventTouch) {
        this.hide();
    }
}
