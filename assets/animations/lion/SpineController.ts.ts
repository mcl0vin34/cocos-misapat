// assets/animations/lion/SpineController.ts

import {
  _decorator,
  Component,
  Node,
  EventTouch,
  UITransform,
  Prefab,
  instantiate,
  Vec2,
  Vec3,
  sp,
} from "cc";
import { SocketManager } from "../../scripts/SocketManager";
const { ccclass, property } = _decorator;

@ccclass("SpineController")
export class SpineController extends Component {
  @property(sp.Skeleton)
  spine: sp.Skeleton = null;

  @property(SocketManager)
  socketManager: SocketManager = null;

  @property(Prefab)
  floatingTextPrefab: Prefab = null; // Ссылка на префаб FloatingText

  onLoad() {
    // Убедимся, что компонент UITransform присутствует
    let uiTransform = this.getComponent(UITransform);
    if (!uiTransform) {
      uiTransform = this.addComponent(UITransform);
    }
    // Устанавливаем размер контента (замените на реальные размеры вашей анимации)
    uiTransform.setContentSize(4000, 3000);
    uiTransform.setAnchorPoint(0.553265, 0.004952);

    // Добавляем обработчик на событие касания непосредственно на узел Spine-анимации
    this.node.on(Node.EventType.TOUCH_END, this.onSpineClicked, this);

    if (this.spine) {
      // Устанавливаем основную анимацию на треке 0
      this.spine.setAnimation(0, "Основная", true);

      // Устанавливаем слушатель завершения анимации
      this.spine.setCompleteListener(this.onAnimationComplete.bind(this));
    } else {
      console.warn("Spine компонент не установлен в SpineController.");
    }
  }

  onSpineClicked(event: EventTouch) {
    // Проверяем, установлен ли SocketManager
    if (this.socketManager) {
      const currentEnergy = this.socketManager.getCurrentEnergy();

      // Проверяем, достаточно ли энергии для тапа (13 и больше)
      if (currentEnergy >= 13) {
        // Если энергии достаточно, выполняем анимацию и отправляем событие тапа

        if (this.spine) {
          // Устанавливаем анимацию 'Нажатие' на треке 1
          this.spine.setAnimation(1, "Нажатие", false);
          // Добавляем возврат к основной анимации после завершения 'Нажатие'
          this.spine.addAnimation(1, "Основная", true, 0);
        }

        // Вызываем метод onTap() из SocketManager
        this.socketManager.onTap();

        // Создаём и анимируем всплывающий текст
        const tapPosition = event.getUILocation(); // Vec2
        this.spawnFloatingText(tapPosition);
      } else {
        // Если энергии недостаточно, выводим сообщение и не запускаем анимацию
        this.socketManager.showMessage(
          "Не хватает энергии для тапа.",
          "warning"
        );
      }
    } else {
      console.warn("SocketManager не установлен в SpineController.");
    }
  }

  onAnimationComplete(entry: sp.spine.TrackEntry) {
    if (entry && entry.trackIndex === 1) {
      // После завершения анимации 'Нажатие' возвращаемся к 'Основная'
      this.spine.setAnimation(1, "Основная", true);
    }
  }

  /**
   * Создаёт и анимирует всплывающий текст "+13" в месте тапа
   * @param tapPosition Позиция тапа в координатах экрана (Vec2)
   */
  spawnFloatingText(tapPosition: Vec2) {
    if (!this.floatingTextPrefab) {
      console.warn("floatingTextPrefab не установлен в SpineController.");
      return;
    }

    // Получаем Canvas
    const canvas = this.node.scene.getChildByName("Canvas");
    if (!canvas) {
      console.warn("Canvas не найден.");
      return;
    }

    // Получаем размер Canvas
    const canvasUITransform = canvas.getComponent(UITransform);
    if (!canvasUITransform) {
      console.warn("UITransform не найден на Canvas.");
      return;
    }
    const canvasSize = canvasUITransform.contentSize;

    // Преобразуем позицию тапа из экранных координат в локальные координаты Canvas
    const localPosX = tapPosition.x - canvasSize.width / 2;
    const localPosY = tapPosition.y - canvasSize.height / 2;
    const localPos = new Vec3(localPosX, localPosY, 100);

    // Создаём экземпляр префаба
    const floatingText = instantiate(this.floatingTextPrefab);
    floatingText.setParent(canvas); // Устанавливаем родителем Canvas

    // Устанавливаем позицию всплывающего текста относительно Canvas
    floatingText.setPosition(localPos);

    // Запускаем анимацию (скрипт FloatingText.ts уже запускает анимацию в методе start)
  }
}
