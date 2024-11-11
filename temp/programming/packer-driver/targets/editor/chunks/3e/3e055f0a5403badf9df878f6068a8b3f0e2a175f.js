System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, sp, UITransform, Prefab, instantiate, Vec3, SocketManager, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, SpineController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfSocketManager(extras) {
    _reporterNs.report("SocketManager", "../../scripts/SocketManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      sp = _cc.sp;
      UITransform = _cc.UITransform;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      SocketManager = _unresolved_2.SocketManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7af28zZEkNKYY1uSBPGocx/", "SpineController.ts", undefined); // assets/animations/lion/SpineController.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'sp', 'EventTouch', 'UITransform', 'Prefab', 'instantiate', 'Vec2', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SpineController", SpineController = (_dec = ccclass('SpineController'), _dec2 = property(sp.Skeleton), _dec3 = property(_crd && SocketManager === void 0 ? (_reportPossibleCrUseOfSocketManager({
        error: Error()
      }), SocketManager) : SocketManager), _dec4 = property(Prefab), _dec(_class = (_class2 = class SpineController extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "spine", _descriptor, this);

          _initializerDefineProperty(this, "socketManager", _descriptor2, this);

          _initializerDefineProperty(this, "floatingTextPrefab", _descriptor3, this);
        }

        // Ссылка на префаб FloatingText
        onLoad() {
          // Убедимся, что компонент UITransform присутствует
          let uiTransform = this.getComponent(UITransform);

          if (!uiTransform) {
            uiTransform = this.addComponent(UITransform);
          } // Устанавливаем размер контента (замените на реальные размеры вашей анимации)


          uiTransform.setContentSize(4000, 3000);
          uiTransform.setAnchorPoint(0.553265, 0.004952); // Добавляем обработчик на событие касания непосредственно на узел Spine-анимации

          this.node.on(Node.EventType.TOUCH_END, this.onSpineClicked, this);

          if (this.spine) {
            // Устанавливаем основную анимацию на треке 0
            this.spine.setAnimation(0, 'Основная', true); // Устанавливаем слушатель завершения анимации

            this.spine.setCompleteListener(this.onAnimationComplete.bind(this));
          } else {
            console.warn('Spine компонент не установлен в SpineController.');
          }
        }

        onSpineClicked(event) {
          console.log('Spine animation clicked');

          if (this.spine) {
            // Устанавливаем анимацию 'Нажатие' на треке 1
            this.spine.setAnimation(1, 'Нажатие', false); // Добавляем возврат к основной анимации после завершения 'Нажатие'

            this.spine.addAnimation(1, 'Основная', true, 0);
          } // Вызываем метод onTap() из SocketManager


          if (this.socketManager) {
            console.log('Calling socketManager.onTap()');
            this.socketManager.onTap();
          } else {
            console.warn('SocketManager не установлен в SpineController.');
          } // Создаём и анимируем всплывающий текст


          const tapPosition = event.getUILocation(); // Vec2

          console.log('Tap Position (UILocation):', tapPosition);
          this.spawnFloatingText(tapPosition);
        }

        onAnimationComplete(entry) {
          if (entry && entry.trackIndex === 1) {
            // После завершения анимации 'Нажатие' возвращаемся к 'Основная'
            this.spine.setAnimation(1, 'Основная', true);
          }
        }
        /**
         * Создаёт и анимирует всплывающий текст "+13" в месте тапа
         * @param tapPosition Позиция тапа в координатах экрана (Vec2)
         */


        spawnFloatingText(tapPosition) {
          if (!this.floatingTextPrefab) {
            console.warn('floatingTextPrefab не установлен в SpineController.');
            return;
          } // Получаем Canvas


          const canvas = this.node.scene.getChildByName('Canvas');

          if (!canvas) {
            console.warn('Canvas не найден.');
            return;
          } // Получаем размер Canvas


          const canvasUITransform = canvas.getComponent(UITransform);

          if (!canvasUITransform) {
            console.warn('UITransform не найден на Canvas.');
            return;
          }

          const canvasSize = canvasUITransform.contentSize;
          console.log('Canvas Size:', canvasSize); // Преобразуем позицию тапа из экранных координат в локальные координаты Canvas

          const localPosX = tapPosition.x - canvasSize.width / 2;
          const localPosY = tapPosition.y - canvasSize.height / 2;
          const localPos = new Vec3(localPosX, localPosY, 100);
          console.log('Converted Local Position:', localPos); // Создаём экземпляр префаба

          const floatingText = instantiate(this.floatingTextPrefab);
          floatingText.setParent(canvas); // Устанавливаем родителем Canvas
          // Устанавливаем позицию всплывающего текста относительно Canvas

          floatingText.setPosition(localPos);
          console.log('FloatingText Position Set To:', floatingText.getPosition()); // Запускаем анимацию (скрипт FloatingText.ts уже запускает анимацию в методе start)
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spine", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "socketManager", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "floatingTextPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3e055f0a5403badf9df878f6068a8b3f0e2a175f.js.map