System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Label, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, PassiveIncomeModal;

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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "dacc2yNsjdBz4TFNY64wdg5", "PassiveIncomeModal", undefined); // assets/scripts/PassiveIncomeModal.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'EventTouch']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PassiveIncomeModal", PassiveIncomeModal = (_dec = ccclass('PassiveIncomeModal'), _dec2 = property(Label), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = class PassiveIncomeModal extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "incomeLabel", _descriptor, this);

          // Метка для отображения количества монет
          _initializerDefineProperty(this, "modalNode", _descriptor2, this);

          // Узел модального окна
          _initializerDefineProperty(this, "closeNode", _descriptor3, this);
        }

        // Узел со спрайтом для закрытия окна
        start() {
          // Скрываем модальное окно при старте
          if (this.modalNode) {
            this.modalNode.active = false;
          } // Добавляем обработчик нажатия на узел со спрайтом


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


        show(income) {
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


        onCloseClicked(event) {
          this.hide();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "incomeLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "modalNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "closeNode", [_dec4], {
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
//# sourceMappingURL=c16b1d6dee28c70390cb2ca10f825ba56a5e901e.js.map