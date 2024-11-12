System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, SocketManager, _dec, _class, _class2, _descriptor, _crd, ccclass, property, GenerateLink;

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
    }, function (_unresolved_2) {
      SocketManager = _unresolved_2.SocketManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b576b2tZrlNErveT39UzGdK", "GenerateLink", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      // Убедись, что путь корректный
      ({
        ccclass,
        property
      } = _decorator);

      _export("GenerateLink", GenerateLink = (_dec = ccclass("GenerateLink"), _dec(_class = (_class2 = class GenerateLink extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "baseUrl", _descriptor, this);
        }

        onLoad() {
          // Добавляем обработчик события нажатия на узел
          this.node.on(Node.EventType.TOUCH_END, this.onGenerateLinkClick, this);
        }

        onGenerateLinkClick() {
          var _Telegram;

          var userId = (_crd && SocketManager === void 0 ? (_reportPossibleCrUseOfSocketManager({
            error: Error()
          }), SocketManager) : SocketManager).instance.getUserId();

          if (!userId) {
            console.error("User ID не установлен.");
            return;
          }

          var fullUrl = "" + this.baseUrl + userId; // Проверяем, доступен ли объект Telegram WebApp

          var tg = (_Telegram = window.Telegram) == null ? void 0 : _Telegram.WebApp;

          if (tg && tg.openTelegramLink) {
            tg.openTelegramLink(fullUrl);
          } else {
            // Если не в Telegram WebApp, открываем ссылку в новом окне
            window.open(fullUrl, "_blank");
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "baseUrl", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "https://t.me/misapatStage_bot?startapp=refId";
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ae7f9a4ae341b2552dbab46d7a2821a01c3b038a.js.map