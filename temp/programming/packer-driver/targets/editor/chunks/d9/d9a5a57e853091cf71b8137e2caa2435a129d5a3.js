System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Label, Vec3, Color, tween, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, ReferralLinkManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "18bc3yUuD1GYI5rJViGJcp5", "ReferralLinkManager", undefined); // assets/scripts/Referral/ReferralLinkManager.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'Vec3', 'Color', 'tween']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ReferralLinkManager", ReferralLinkManager = (_dec = ccclass('ReferralLinkManager'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Label), _dec5 = property(Label), _dec(_class = (_class2 = class ReferralLinkManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "generateLinkNode", _descriptor, this);

          // Нода для создания ссылки
          _initializerDefineProperty(this, "copyLinkNode", _descriptor2, this);

          // Нода для копирования ссылки
          _initializerDefineProperty(this, "referralLinkLabel", _descriptor3, this);

          // Метка для отображения ссылки
          _initializerDefineProperty(this, "copyNotificationLabel", _descriptor4, this);

          // Метка для уведомления о копировании
          this.referralLink = '';
          this.userId = 777270195;

          // Фиксированный user_id
          // Параметры анимации
          _initializerDefineProperty(this, "animationDuration", _descriptor5, this);

          // Продолжительность анимации в секундах
          _initializerDefineProperty(this, "moveUpDistance", _descriptor6, this);

          // Расстояние, на которое уведомление будет подниматься
          this.initialPosition = new Vec3();
        }

        start() {
          // Проверка наличия всех нод
          if (!this.generateLinkNode) {
            console.error('generateLinkNode не назначен в ReferralLinkManager.');
          }

          if (!this.copyLinkNode) {
            console.error('copyLinkNode не назначен в ReferralLinkManager.');
          }

          if (!this.referralLinkLabel) {
            console.error('referralLinkLabel не назначен в ReferralLinkManager.');
          }

          if (!this.copyNotificationLabel) {
            console.error('copyNotificationLabel не назначен в ReferralLinkManager.');
          } // Назначаем обработчик нажатия на ноду "Создать ссылку"


          if (this.generateLinkNode) {
            this.generateLinkNode.on(Node.EventType.TOUCH_END, this.onGenerateLinkClicked, this);
          } // Назначаем обработчик нажатия на ноду "Копировать ссылку" и скрываем её по умолчанию


          if (this.copyLinkNode) {
            this.copyLinkNode.on(Node.EventType.TOUCH_END, this.onCopyLinkClicked, this);
            this.copyLinkNode.active = false; // Скрыть кнопку копирования до создания ссылки
          } // Инициализируем уведомление как скрытое и сохраняем начальную позицию


          if (this.copyNotificationLabel) {
            this.copyNotificationLabel.node.active = false; // Скрыть уведомление по умолчанию

            this.initialPosition = this.copyNotificationLabel.node.position.clone();
          }
        }
        /**
         * Обработчик нажатия на ноду "Создать ссылку"
         */


        onGenerateLinkClicked() {
          this.referralLink = this.getReferralLink(this.userId);
          this.referralLinkLabel.string = this.referralLink;
          console.log(`Реферальная ссылка создана: ${this.referralLink}`);

          if (this.copyLinkNode) {
            this.copyLinkNode.active = true; // Показать кнопку копирования после создания ссылки
          }
        }
        /**
         * Генерирует реферальную ссылку на основе user_id
         * @param userId ID пользователя
         * @returns Реферальная ссылка
         */


        getReferralLink(userId) {
          return `https://t.me/misapatStage_bot?startapp=refId${userId}`;
        }
        /**
         * Обработчик нажатия на ноду "Копировать ссылку"
         */


        async onCopyLinkClicked() {
          // Запускаем анимацию уведомления сразу при нажатии на кнопку
          if (this.copyNotificationLabel) {
            this.copyNotificationLabel.node.active = true; // Убедимся, что цвет и позиция инициализированы правильно

            this.copyNotificationLabel.color = new Color(255, 255, 255, 255);
            this.copyNotificationLabel.node.setPosition(this.initialPosition.clone()); // Анимация для цвета: плавное исчезновение

            tween(this.copyNotificationLabel).to(this.animationDuration, {
              color: new Color(255, 255, 255, 0)
            }).start(); // Анимация для позиции: подъем вверх

            tween(this.copyNotificationLabel.node).by(this.animationDuration, {
              position: new Vec3(0, this.moveUpDistance, 0)
            }).call(() => {
              this.copyNotificationLabel.node.active = false; // Скрыть уведомление после анимации
              // Восстановить первоначальный цвет и позицию для будущих уведомлений

              this.copyNotificationLabel.color = new Color(255, 255, 255, 255);
              this.copyNotificationLabel.node.setPosition(this.initialPosition.clone());
            }).start();
          } // Выполняем копирование ссылки


          if (!this.referralLink) {
            console.warn('Реферальная ссылка не создана.');
            return;
          }

          try {
            await navigator.clipboard.writeText(this.referralLink);
            console.log('Реферальная ссылка скопирована в буфер обмена.');
          } catch (err) {
            console.error('Не удалось скопировать ссылку: ', err); // Можно добавить уведомление об ошибке, если необходимо
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "generateLinkNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "copyLinkNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "referralLinkLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "copyNotificationLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "animationDuration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1.5;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "moveUpDistance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 300;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d9a5a57e853091cf71b8137e2caa2435a129d5a3.js.map