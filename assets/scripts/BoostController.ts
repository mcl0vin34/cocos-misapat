// assets/scripts/BoostController.ts

import { _decorator, Component, Node, EventTouch, Label, Vec3, Color, tween } from 'cc';
import { SocketManager } from './SocketManager';
const { ccclass, property } = _decorator;

@ccclass('BoostController')
export class BoostController extends Component {
    @property(SocketManager)
    socketManager: SocketManager = null; // Ссылка на SocketManager

    @property(Label)
    notificationLabel: Label = null; // Метка для уведомления

    @property
    animationDuration: number = 1.5; // Длительность анимации в секундах

    @property
    moveUpDistance: number = 50; // Расстояние подъёма уведомления

    private initialPosition: Vec3 = new Vec3();

    onLoad() {
        // Добавляем обработчик на событие касания на узел
        this.node.on(Node.EventType.TOUCH_END, this.onBoostClicked, this);

        // Инициализируем уведомление как скрытое и сохраняем начальную позицию
        if (this.notificationLabel) {
            this.notificationLabel.node.active = false; // Скрыть уведомление по умолчанию
            this.initialPosition = this.notificationLabel.node.position.clone();
        } else {
            console.error('notificationLabel не назначен в BoostController.');
        }
    }

    onBoostClicked(event: EventTouch) {
        if (this.socketManager) {
            const currentEnergy = this.socketManager.getCurrentEnergy();
            const currentBoosts = this.socketManager.getCurrentBoosts();

            if (currentBoosts <= 0) {
                // Нет доступных бустов
                this.showNotification('Бустеры кончились!');
                console.log('No boosts left.');
                return;
            }

            if (currentEnergy >= 300) {
                // Энергии достаточно, буст не активируем
                this.showNotification('Слишком много энергии!');
                console.log('Energy is 300 or more, boost not activated.');
                return;
            }

            // Если энергии меньше 300 и есть бусты, активируем буст
            this.socketManager.activateBoost();

            // Отобразим уведомление "Энергия восстановлена!"
            this.showNotification('Энергия восстановлена!');
        } else {
            console.warn('SocketManager is not assigned in BoostController.');
        }
    }

    /**
     * Отображает уведомление с анимацией
     * @param message Текст уведомления
     */
    showNotification(message: string) {
        if (this.notificationLabel) {
            this.notificationLabel.string = message;
            this.notificationLabel.node.active = true;

            // Убедимся, что цвет и позиция инициализированы правильно
            this.notificationLabel.color = new Color(255, 255, 255, 255);
            this.notificationLabel.node.setPosition(this.initialPosition.clone());

            // Анимация для цвета: плавное исчезновение
            tween(this.notificationLabel)
                .to(this.animationDuration, { color: new Color(255, 255, 255, 0) })
                .start();

            // Анимация для позиции: подъем вверх
            tween(this.notificationLabel.node)
                .by(this.animationDuration, { position: new Vec3(0, this.moveUpDistance, 0) })
                .call(() => {
                    this.notificationLabel.node.active = false; // Скрыть уведомление после анимации
                    // Восстановить первоначальный цвет и позицию для будущих уведомлений
                    this.notificationLabel.color = new Color(255, 255, 255, 255);
                    this.notificationLabel.node.setPosition(this.initialPosition.clone());
                })
                .start();
        } else {
            console.warn('notificationLabel is not assigned in BoostController.');
        }
    }
}
