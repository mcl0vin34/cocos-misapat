System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Label, Vec3, Color, tween, SocketManager, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, BoostController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfSocketManager(extras) {
    _reporterNs.report("SocketManager", "./SocketManager", _context.meta, extras);
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
      Label = _cc.Label;
      Vec3 = _cc.Vec3;
      Color = _cc.Color;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      SocketManager = _unresolved_2.SocketManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "56fbbewdwxJOIoAGHAh8WY0", "BoostController", undefined); // assets/scripts/BoostController.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'EventTouch', 'Label', 'Vec3', 'Color', 'tween']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BoostController", BoostController = (_dec = ccclass('BoostController'), _dec2 = property(_crd && SocketManager === void 0 ? (_reportPossibleCrUseOfSocketManager({
        error: Error()
      }), SocketManager) : SocketManager), _dec3 = property(Label), _dec(_class = (_class2 = class BoostController extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "socketManager", _descriptor, this);

          // Ссылка на SocketManager
          _initializerDefineProperty(this, "notificationLabel", _descriptor2, this);

          // Метка для уведомления
          _initializerDefineProperty(this, "animationDuration", _descriptor3, this);

          // Длительность анимации в секундах
          _initializerDefineProperty(this, "moveUpDistance", _descriptor4, this);

          // Расстояние подъёма уведомления
          this.initialPosition = new Vec3();
        }

        onLoad() {
          // Добавляем обработчик на событие касания на узел
          this.node.on(Node.EventType.TOUCH_END, this.onBoostClicked, this); // Инициализируем уведомление как скрытое и сохраняем начальную позицию

          if (this.notificationLabel) {
            this.notificationLabel.node.active = false; // Скрыть уведомление по умолчанию

            this.initialPosition = this.notificationLabel.node.position.clone();
          } else {
            console.error('notificationLabel не назначен в BoostController.');
          }
        }

        onBoostClicked(event) {
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
            } // Если энергии меньше 300 и есть бусты, активируем буст


            this.socketManager.activateBoost(); // Отобразим уведомление "Энергия восстановлена!"

            this.showNotification('Энергия восстановлена!');
          } else {
            console.warn('SocketManager is not assigned in BoostController.');
          }
        }
        /**
         * Отображает уведомление с анимацией
         * @param message Текст уведомления
         */


        showNotification(message) {
          if (this.notificationLabel) {
            this.notificationLabel.string = message;
            this.notificationLabel.node.active = true; // Убедимся, что цвет и позиция инициализированы правильно

            this.notificationLabel.color = new Color(255, 255, 255, 255);
            this.notificationLabel.node.setPosition(this.initialPosition.clone()); // Анимация для цвета: плавное исчезновение

            tween(this.notificationLabel).to(this.animationDuration, {
              color: new Color(255, 255, 255, 0)
            }).start(); // Анимация для позиции: подъем вверх

            tween(this.notificationLabel.node).by(this.animationDuration, {
              position: new Vec3(0, this.moveUpDistance, 0)
            }).call(() => {
              this.notificationLabel.node.active = false; // Скрыть уведомление после анимации
              // Восстановить первоначальный цвет и позицию для будущих уведомлений

              this.notificationLabel.color = new Color(255, 255, 255, 255);
              this.notificationLabel.node.setPosition(this.initialPosition.clone());
            }).start();
          } else {
            console.warn('notificationLabel is not assigned in BoostController.');
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "socketManager", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "notificationLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "animationDuration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.5;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "moveUpDistance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 50;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9d9e8ad6500d13bfe6cc28ac06b642eaf6b5a790.js.map