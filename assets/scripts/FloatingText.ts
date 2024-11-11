// assets/scripts/FloatingText.ts

import { _decorator, Component, Label, Vec3, Color, tween, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FloatingText')
export class FloatingText extends Component {
    @property
    duration: number = 1.5; // Продолжительность анимации в секундах

    @property
    moveUpDistance: number = 300; // Расстояние, на которое текст будет подниматься

    start() {
        const label = this.getComponent(Label) || this.getComponentInChildren(Label);
        if (!label) {
            return;
        }

        label.color = new Color(label.color.r, label.color.g, label.color.b, 255);

        tween(label)
            .to(this.duration, { color: new Color(label.color.r, label.color.g, label.color.b, 0) })
            .start();

        tween(this.node)
            .by(this.duration, { position: new Vec3(0, this.moveUpDistance, 0) })
            .call(() => {
                this.node.destroy();
            })
            .start();
    }
}
