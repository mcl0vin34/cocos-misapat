System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Vec3, Color, tween, _dec, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, FloatingText;

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
      Label = _cc.Label;
      Vec3 = _cc.Vec3;
      Color = _cc.Color;
      tween = _cc.tween;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bd2afV6GjdEioGJ6Sb+apw4", "FloatingText", undefined); // assets/scripts/FloatingText.ts


      __checkObsolete__(['_decorator', 'Component', 'Label', 'Vec3', 'Color', 'tween', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("FloatingText", FloatingText = (_dec = ccclass('FloatingText'), _dec(_class = (_class2 = class FloatingText extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "duration", _descriptor, this);

          // Продолжительность анимации в секундах
          _initializerDefineProperty(this, "moveUpDistance", _descriptor2, this);
        }

        // Расстояние, на которое текст будет подниматься
        start() {
          var label = this.getComponent(Label) || this.getComponentInChildren(Label);

          if (!label) {
            return;
          }

          label.color = new Color(label.color.r, label.color.g, label.color.b, 255);
          tween(label).to(this.duration, {
            color: new Color(label.color.r, label.color.g, label.color.b, 0)
          }).start();
          tween(this.node).by(this.duration, {
            position: new Vec3(0, this.moveUpDistance, 0)
          }).call(() => {
            this.node.destroy();
          }).start();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "duration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "moveUpDistance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 300;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5a103e7a2c094e0cf964b247228c185a192c831e.js.map