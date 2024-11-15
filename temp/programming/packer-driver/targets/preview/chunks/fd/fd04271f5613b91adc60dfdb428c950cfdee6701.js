System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, ProfileModal;

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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bc556ZFRnpMnYIvGUp1KHAx", "ProfileModal", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ProfileModal", ProfileModal = (_dec = ccclass("ProfileModal"), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = class ProfileModal extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "avatarIcon", _descriptor, this);

          // Узел иконки аватара
          _initializerDefineProperty(this, "profileModal", _descriptor2, this);

          // Узел модального окна ProfileModal
          _initializerDefineProperty(this, "closeButton", _descriptor3, this);
        }

        // Узел кнопки закрытия (крестика)
        onLoad() {
          // Изначально скрываем модальное окно
          if (this.profileModal) {
            this.profileModal.active = false;
          } // Назначаем обработчик события для иконки аватара, чтобы открыть модальное окно


          if (this.avatarIcon) {
            this.avatarIcon.on(Node.EventType.TOUCH_END, this.showModal, this);
          } // Назначаем обработчик события для кнопки закрытия (крестика) внутри модального окна


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

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "avatarIcon", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "profileModal", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fd04271f5613b91adc60dfdb428c950cfdee6701.js.map