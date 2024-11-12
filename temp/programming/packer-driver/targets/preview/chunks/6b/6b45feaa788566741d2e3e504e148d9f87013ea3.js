System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Label, Vec3, Color, tween, sys, SocketManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, ReferralLinkManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
      sys = _cc.sys;
    }, function (_unresolved_2) {
      SocketManager = _unresolved_2.SocketManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "18bc3yUuD1GYI5rJViGJcp5", "ReferralLinkManager", undefined); // assets/scripts/Referral/ReferralLinkManager.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'Vec3', 'Color', 'tween', 'sys']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ReferralLinkManager", ReferralLinkManager = (_dec = ccclass("ReferralLinkManager"), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Label), _dec6 = property(Label), _dec(_class = (_class2 = class ReferralLinkManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "generateLinkNode", _descriptor, this);

          _initializerDefineProperty(this, "copyLinkNode", _descriptor2, this);

          _initializerDefineProperty(this, "inviteFriendNode", _descriptor3, this);

          _initializerDefineProperty(this, "referralLinkLabel", _descriptor4, this);

          _initializerDefineProperty(this, "copyNotificationLabel", _descriptor5, this);

          this.referralLink = "";

          _initializerDefineProperty(this, "animationDuration", _descriptor6, this);

          _initializerDefineProperty(this, "moveUpDistance", _descriptor7, this);

          this.initialPosition = new Vec3();
        }

        start() {
          if (!this.copyLinkNode) {
            console.error("copyLinkNode не назначен в ReferralLinkManager.");
          }

          if (!this.inviteFriendNode) {
            console.error("inviteFriendNode не назначен в ReferralLinkManager.");
          }

          if (!this.referralLinkLabel) {
            console.error("referralLinkLabel не назначен в ReferralLinkManager.");
          }

          if (!this.copyNotificationLabel) {
            console.error("copyNotificationLabel не назначен в ReferralLinkManager.");
          } // Генерируем реферальную ссылку при старте


          this.generateReferralLink(); // Назначаем обработчики событий

          if (this.copyLinkNode) {
            this.copyLinkNode.on(Node.EventType.TOUCH_END, this.onCopyLinkClicked, this);
            this.copyLinkNode.active = true;
          }

          if (this.inviteFriendNode) {
            this.inviteFriendNode.on(Node.EventType.TOUCH_END, this.onInviteFriendClicked, this);
          }

          if (this.copyNotificationLabel) {
            this.copyNotificationLabel.node.active = false;
            this.initialPosition = this.copyNotificationLabel.node.position.clone();
          }

          if (this.generateLinkNode) {
            this.generateLinkNode.on(Node.EventType.TOUCH_END, this.onGenerateLinkClicked, this);
          }
        }

        generateReferralLink() {
          if (!(_crd && SocketManager === void 0 ? (_reportPossibleCrUseOfSocketManager({
            error: Error()
          }), SocketManager) : SocketManager).instance) {
            console.error("SocketManager не инициализирован.");
            return;
          }

          var userId = (_crd && SocketManager === void 0 ? (_reportPossibleCrUseOfSocketManager({
            error: Error()
          }), SocketManager) : SocketManager).instance.getUserId();
          console.log("User ID:", userId);

          if (!userId) {
            console.error("userId не установлен в SocketManager.");
            return;
          }

          this.referralLink = "https://t.me/misapatStage_bot?startapp=refId" + userId;

          if (this.referralLinkLabel) {
            this.referralLinkLabel.string = this.referralLink;
          }

          console.log("\u0420\u0435\u0444\u0435\u0440\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0430: " + this.referralLink);
        }

        onGenerateLinkClicked() {
          console.log("onGenerateLinkClicked called");
          this.generateReferralLink();
        }

        onCopyLinkClicked() {
          var _this = this;

          return _asyncToGenerator(function* () {
            console.log("onCopyLinkClicked called");

            if (_this.copyNotificationLabel) {
              _this.copyNotificationLabel.node.active = true;
              _this.copyNotificationLabel.color = new Color(255, 255, 255, 255);

              _this.copyNotificationLabel.node.setPosition(_this.initialPosition.clone());

              tween(_this.copyNotificationLabel).to(_this.animationDuration, {
                color: new Color(255, 255, 255, 0)
              }).start();
              tween(_this.copyNotificationLabel.node).by(_this.animationDuration, {
                position: new Vec3(0, _this.moveUpDistance, 0)
              }).call(() => {
                _this.copyNotificationLabel.node.active = false;
                _this.copyNotificationLabel.color = new Color(255, 255, 255, 255);

                _this.copyNotificationLabel.node.setPosition(_this.initialPosition.clone());
              }).start();
            }

            if (!_this.referralLink) {
              console.warn("Реферальная ссылка не создана.");
              return;
            }

            try {
              yield navigator.clipboard.writeText(_this.referralLink);
              console.log("Реферальная ссылка скопирована в буфер обмена.");
            } catch (err) {
              console.error("Не удалось скопировать ссылку: ", err);
            }
          })();
        }

        onInviteFriendClicked() {
          var _Telegram;

          console.log("onInviteFriendClicked called");

          if (!this.referralLink) {
            console.warn("Реферальная ссылка не создана.");
            return;
          }

          console.log("Открываем ссылку:", this.referralLink);
          var tg = (_Telegram = window.Telegram) == null ? void 0 : _Telegram.WebApp;

          if (tg && tg.openTelegramLink) {
            console.log("Используем tg.openTelegramLink для открытия ссылки");
            tg.openTelegramLink(this.referralLink);
          } else {
            console.log("Используем sys.openURL для открытия ссылки");
            sys.openURL(this.referralLink);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "generateLinkNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "copyLinkNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "inviteFriendNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "referralLinkLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "copyNotificationLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "animationDuration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.5;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "moveUpDistance", [property], {
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
//# sourceMappingURL=6b45feaa788566741d2e3e504e148d9f87013ea3.js.map