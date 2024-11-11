System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Color, ProgressBar, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, SocketManager;

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
      Color = _cc.Color;
      ProgressBar = _cc.ProgressBar;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a0c39VZ6j5NRrT6cxMHqDGB", "SocketManager", undefined); // assets/scripts/SocketManager.ts


      __checkObsolete__(['_decorator', 'Component', 'Label', 'Color', 'ProgressBar']);

      // Глобальная переменная для socket.io
      ({
        ccclass,
        property
      } = _decorator);

      _export("SocketManager", SocketManager = (_dec = ccclass('SocketManager'), _dec2 = property(Label), _dec3 = property(ProgressBar), _dec4 = property(Label), _dec5 = property(Label), _dec(_class = (_class2 = class SocketManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "coinsLabel", _descriptor, this);

          _initializerDefineProperty(this, "energyProgressBar", _descriptor2, this);

          // Свойство для ProgressBar
          _initializerDefineProperty(this, "energyValueLabel", _descriptor3, this);

          // Свойство для текстовой метки под прогресс-баром
          _initializerDefineProperty(this, "messagesLabel", _descriptor4, this);

          this.socket = null;
          this.userId = 777270195;
          // Фиксированный userId
          this.maxEnergy = 2000;
          // Максимальное значение энергии
          this.currentEnergy = 0;
        }

        // Текущее значение энергии
        start() {
          if (!this.coinsLabel || !this.energyProgressBar || !this.energyValueLabel || !this.messagesLabel) {
            return;
          }

          this.autoConnect();
          this.showUserInfo(false);
        }

        onDestroy() {
          if (this.socket) {
            this.socket.disconnect();
          }
        }
        /**
         * Автоматически подключается к серверу Socket.IO с фиксированным userId
         */


        autoConnect() {
          try {
            this.socket = io('https://dev.simatap.ru', {
              transports: ['websocket'],
              secure: true,
              rejectUnauthorized: false
            });
            this.socket.on('connect', () => {
              this.socket.emit('register', {
                userId: this.userId
              });
              this.showUserInfo(true);
            });
            this.socket.on('disconnect', () => {
              this.showMessage('Отключено от сервера.', 'danger');
              this.showUserInfo(false);
            });
            this.socket.on('energyUpdated', data => {
              this.updateEnergy(data.energy_left);
            });
            this.socket.on('coinsUpdated', data => {
              var roundedCoins = Math.round(data.coins);
              this.coinsLabel.string = roundedCoins.toLocaleString(); // Добавляем разделители тысяч
            });
            this.socket.on('tapError', data => {
              this.showMessage(data.message, 'warning');
            });
            this.socket.on('registrationError', data => {
              this.showMessage(data.message, 'danger');
              this.showUserInfo(false);
            });
            this.socket.on('connect_error', error => {
              this.showMessage('Ошибка подключения к серверу.', 'danger');
            });
          } catch (error) {
            this.showMessage('Ошибка подключения к серверу.', 'danger');
          }
        }
        /**
         * Обработчик события "tap"
         */


        onTap() {
          if (!this.userId) {
            this.showMessage('Пользователь не подключен.', 'danger');
            return;
          }

          if (this.socket && this.socket.connected) {
            this.socket.emit('tap', {
              userId: this.userId
            });
            this.showMessage('Тап отправлен!', 'info');
          } else {
            this.showMessage('Соединение с сервером отсутствует.', 'danger');
          }
        }
        /**
         * Отображает сообщение пользователю
         * @param message Текст сообщения
         * @param type Тип сообщения ('success', 'danger', 'warning', 'info')
         */


        showMessage(message, type) {
          if (type === void 0) {
            type = 'info';
          }

          if (this.messagesLabel) {
            this.messagesLabel.string = message;

            switch (type) {
              case 'success':
                this.messagesLabel.node.color = new Color(0, 255, 0);
                break;

              case 'danger':
                this.messagesLabel.node.color = new Color(255, 0, 0);
                break;

              case 'warning':
                this.messagesLabel.node.color = new Color(255, 165, 0);
                break;

              default:
                this.messagesLabel.node.color = new Color(255, 255, 255);
            }
          }
        }
        /**
         * Показывает или скрывает UserInfo
         * @param show Показывать или скрывать
         */


        showUserInfo(show) {
          if (this.coinsLabel && this.energyProgressBar && this.energyValueLabel) {
            this.coinsLabel.node.active = show;
            this.energyProgressBar.node.active = show;
            this.energyValueLabel.node.active = show;
          }
        }
        /**
         * Обновляет прогресс-бар энергии и текстовую метку.
         * @param currentEnergy Текущее значение энергии.
         */


        updateEnergy(currentEnergy) {
          currentEnergy = Math.max(0, Math.min(this.maxEnergy, currentEnergy));
          this.currentEnergy = currentEnergy;
          var progress = currentEnergy / this.maxEnergy;
          this.energyProgressBar.progress = progress;
          this.energyValueLabel.string = currentEnergy + "/" + this.maxEnergy;
        }
        /**
         * Возвращает текущее значение энергии
         */


        getCurrentEnergy() {
          return this.currentEnergy;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "coinsLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "energyProgressBar", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "energyValueLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "messagesLabel", [_dec5], {
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
//# sourceMappingURL=cf7437b4f87eca746e9822b9032e3a86210922b9.js.map