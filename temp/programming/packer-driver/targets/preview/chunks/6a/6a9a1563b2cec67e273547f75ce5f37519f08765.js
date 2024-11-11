System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Color, ProgressBar, IncomeManager, PassiveIncomeModal, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3, _crd, ccclass, property, SocketManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfIncomeManager(extras) {
    _reporterNs.report("IncomeManager", "./IncomeManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPassiveIncomeModal(extras) {
    _reporterNs.report("PassiveIncomeModal", "./PassiveIncomeModal", _context.meta, extras);
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
      Label = _cc.Label;
      Color = _cc.Color;
      ProgressBar = _cc.ProgressBar;
    }, function (_unresolved_2) {
      IncomeManager = _unresolved_2.IncomeManager;
    }, function (_unresolved_3) {
      PassiveIncomeModal = _unresolved_3.PassiveIncomeModal;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a0c39VZ6j5NRrT6cxMHqDGB", "SocketManager", undefined); // assets/scripts/SocketManager.ts


      __checkObsolete__(['_decorator', 'Component', 'Label', 'Color', 'ProgressBar', 'Node']); // Убедитесь, что путь корректный


      // Импортируем модальное окно пассивного дохода
      // Глобальная переменная для socket.io
      ({
        ccclass,
        property
      } = _decorator);

      _export("SocketManager", SocketManager = (_dec = ccclass("SocketManager"), _dec2 = property(Label), _dec3 = property(ProgressBar), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(_crd && IncomeManager === void 0 ? (_reportPossibleCrUseOfIncomeManager({
        error: Error()
      }), IncomeManager) : IncomeManager), _dec8 = property(_crd && PassiveIncomeModal === void 0 ? (_reportPossibleCrUseOfPassiveIncomeModal({
        error: Error()
      }), PassiveIncomeModal) : PassiveIncomeModal), _dec(_class = (_class2 = (_class3 = class SocketManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "coinsLabel", _descriptor, this);

          _initializerDefineProperty(this, "energyProgressBar", _descriptor2, this);

          _initializerDefineProperty(this, "energyValueLabel", _descriptor3, this);

          _initializerDefineProperty(this, "messagesLabel", _descriptor4, this);

          _initializerDefineProperty(this, "boostsLabel", _descriptor5, this);

          // Свойство для отображения количества бустов
          _initializerDefineProperty(this, "incomeManager", _descriptor6, this);

          // Ссылка на IncomeManager
          _initializerDefineProperty(this, "passiveIncomeModal", _descriptor7, this);

          // Ссылка на компонент модального окна
          this.socket = null;
          this.userId = 124124124;
          // Инициализируйте или получите динамически
          this.maxEnergy = 2000;
          // Максимальное значение энергии
          this.currentEnergy = 0;
          // Текущее значение энергии
          this.currentBoosts = 0;
          // Текущее количество бустов
          this.maxBoosts = 6;
          // Максимальное количество бустов
          this.currentCoins = 0;
        }

        // Геттер для доступа к экземпляру Singleton
        static get instance() {
          if (!SocketManager._instance) {
            console.error("SocketManager не инициализирован. Убедитесь, что он добавлен на ноду в сцене.");
          }

          return SocketManager._instance;
        }

        // Текущее количество монет
        onLoad() {
          if (SocketManager._instance && SocketManager._instance !== this) {
            console.warn("SocketManager уже существует. Удаление дубликата.");
            this.node.destroy();
            return;
          }

          SocketManager._instance = this;
        }

        start() {
          if (!this.coinsLabel || !this.energyProgressBar || !this.energyValueLabel || !this.messagesLabel || !this.boostsLabel) {
            console.error("Не все необходимые компоненты назначены в SocketManager.");
            return;
          } // Если incomeManager не установлен в инспекторе, пытаемся найти его в сцене


          if (!this.incomeManager) {
            var incomeManagerNode = this.node.scene.getChildByName("IncomeManagerNode"); // Замените на реальное имя узла

            if (incomeManagerNode) {
              this.incomeManager = incomeManagerNode.getComponent(_crd && IncomeManager === void 0 ? (_reportPossibleCrUseOfIncomeManager({
                error: Error()
              }), IncomeManager) : IncomeManager);
            } else {
              console.warn("IncomeManager не найден в сцене.");
            }
          }

          this.autoConnect();
          this.showUserInfo(false); // Проверяем пассивный доход

          this.checkPassiveIncome();
        }

        onDestroy() {
          if (this.socket) {
            this.socket.disconnect();
          } // Очистка экземпляра Singleton при уничтожении


          if (SocketManager._instance === this) {
            SocketManager._instance = null;
          }
        }
        /**
         * Автоматически подключается к серверу Socket.IO с фиксированным userId
         */


        autoConnect() {
          try {
            this.socket = io("https://dev.simatap.ru", {
              transports: ["websocket"],
              secure: true,
              rejectUnauthorized: false
            });
            this.socket.on("connect", () => {
              this.socket.emit("register", {
                userId: this.userId
              });
              this.showUserInfo(true); // Получаем начальные данные

              this.fetchInitialData();
            });
            this.socket.on("disconnect", () => {
              this.showMessage("Отключено от сервера.", "danger");
              this.showUserInfo(false);
            });
            this.socket.on("energyUpdated", data => {
              console.log("Received energyUpdated event:", data);

              if (data.energy_left !== undefined) {
                this.updateEnergy(Math.round(data.energy_left));
              } else {
                console.warn("energyUpdated event received, but energy_left is undefined.");
              }
            }); // Обработчик обновления количества бустов

            this.socket.on("boostsUpdated", data => {
              console.log("Received boostsUpdated event:", data);

              if (data.boosts_left !== undefined) {
                this.updateBoosts(data.boosts_left);
              } else {
                console.warn("boostsUpdated event received, but boosts_left is undefined.");
              }
            }); // Обработчик события обновления монет (если сервер отправляет такое событие)

            this.socket.on("coinsUpdated", data => {
              console.log("Received coinsUpdated event:", data);

              if (data.coins !== undefined) {
                this.updateCoins(Math.round(data.coins));
              } else {
                console.warn("coinsUpdated event received, but coins is undefined.");
              }
            }); // Остальные обработчики событий

            this.socket.on("tapError", data => {
              this.showMessage(data.message, "warning");
            });
            this.socket.on("registrationError", data => {
              this.showMessage(data.message, "danger");
              this.showUserInfo(false);
            });
            this.socket.on("connect_error", error => {
              this.showMessage("Ошибка подключения к серверу.", "danger");
            }); // Обработчик ответа на активацию буста

            this.socket.on("boostActivated", data => {
              console.log("Boost activation response:", data); // Обновляем энергию, если сервер вернул новое значение

              if (data.newEnergyValue !== undefined) {
                this.updateEnergy(Math.round(data.newEnergyValue));
              } // Обновление количества бустов будет обработано через событие 'boostsUpdated'

            }); // Обработчик ошибки при активации буста

            this.socket.on("boostError", data => {
              console.error("Ошибка активации буста:", data.message); // Ошибки при активации буста будут обработаны в BoostController
            });
          } catch (error) {
            this.showMessage("Ошибка подключения к серверу.", "danger");
            console.error("Socket connection error:", error);
          }
        }
        /**
         * Получает начальные данные с API и обновляет состояние
         */


        fetchInitialData() {
          var _this = this;

          return _asyncToGenerator(function* () {
            try {
              var response = yield fetch("https://dev.simatap.ru/api/users/" + _this.userId);

              if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
              }

              var data = yield response.json();
              console.log("API response:", data); // Обновляем энергию

              if (data.energy_left !== undefined) {
                _this.updateEnergy(Math.round(data.energy_left));

                console.log("Initial energy fetched: " + Math.round(data.energy_left));
              } else {
                console.warn("Energy data not found in API response.");
              } // Обновляем количество бустов


              if (data.boosts_left !== undefined) {
                _this.updateBoosts(data.boosts_left);

                console.log("Initial boosts fetched: " + data.boosts_left);
              } else {
                console.warn("Boosts data not found in API response.");
              } // Если в ответе есть поле с монетами, обновляем его


              if (data.coins !== undefined) {
                _this.updateCoins(Math.round(data.coins));

                console.log("Initial coins fetched: " + Math.round(data.coins));
              } else {
                console.warn("Coins data not found in API response.");
              }
            } catch (error) {
              console.error("Error fetching initial data:", error);
            }
          })();
        }
        /**
         * Обновляет количество монет и соответствующую метку.
         * @param coins Новое количество монет.
         */


        updateCoins(coins) {
          this.currentCoins = coins;

          if (this.coinsLabel) {
            this.coinsLabel.string = this.currentCoins.toLocaleString();
          } else {
            console.warn("coinsLabel не назначен в SocketManager.");
          }
        }
        /**
         * Проверяет и обрабатывает пассивный доход
         */


        checkPassiveIncome() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            var income = yield _this2.fetchPassiveIncome();

            if (income > 0) {
              if (_this2.passiveIncomeModal) {
                _this2.passiveIncomeModal.show(income);
              } else {
                console.warn("PassiveIncomeModal не назначен в SocketManager.");
              } // Обновляем количество монет


              _this2.currentCoins += income;

              _this2.updateCoins(_this2.currentCoins);
            }
          })();
        }
        /**
         * Получает пассивный доход с сервера и возвращает его
         */


        fetchPassiveIncome() {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            try {
              var response = yield fetch("https://dev.simatap.ru/api/passiveIncome?userId=" + _this3.userId);

              if (!response.ok) {
                var errorText = yield response.text();
                throw new Error("HTTP error! status: " + response.status + ", response: " + errorText);
              }

              var data = yield response.json();
              console.log("Passive income API response:", data);

              if ("passive_income_earned" in data) {
                var income = Math.round(data.passive_income_earned);
                console.log("\u041F\u0430\u0441\u0441\u0438\u0432\u043D\u044B\u0439 \u0434\u043E\u0445\u043E\u0434 \u043F\u043E\u043B\u0443\u0447\u0435\u043D: " + income);
                return income;
              } else if ("message" in data) {
                console.log("\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430: " + data.message);
                return 0;
              } else {
                console.warn("Неизвестный формат ответа от сервера:", data);
                return 0;
              }
            } catch (error) {
              console.error("Ошибка при получении пассивного дохода:", error);
              return 0;
            }
          })();
        }
        /**
         * Обновляет количество бустов и соответствующую метку.
         * @param boostsLeft Текущее количество оставшихся бустов.
         */


        updateBoosts(boostsLeft) {
          this.currentBoosts = boostsLeft;

          if (this.boostsLabel) {
            this.boostsLabel.string = this.currentBoosts + "/" + this.maxBoosts;
          } else {
            console.warn("boostsLabel не назначен в SocketManager.");
          }
        }
        /**
         * Обновляет прогресс-бар энергии и текстовую метку.
         * @param currentEnergy Текущее значение энергии.
         */


        updateEnergy(currentEnergy) {
          currentEnergy = Math.round(Math.max(0, Math.min(this.maxEnergy, currentEnergy)));
          this.currentEnergy = currentEnergy;
          console.log("Energy updated:", this.currentEnergy);
          var progress = currentEnergy / this.maxEnergy;
          this.energyProgressBar.progress = progress;
          this.energyValueLabel.string = currentEnergy + "/" + this.maxEnergy;
        }
        /**
         * Показывает или скрывает UserInfo
         * @param show Показывать или скрывать
         */


        showUserInfo(show) {
          if (this.coinsLabel && this.energyProgressBar && this.energyValueLabel && this.boostsLabel) {
            this.coinsLabel.node.active = show;
            this.energyProgressBar.node.active = show;
            this.energyValueLabel.node.active = show;
            this.boostsLabel.node.active = show;
          }
        }
        /**
         * Отображает сообщение пользователю
         * @param message Текст сообщения
         * @param type Тип сообщения ('success', 'danger', 'warning', 'info')
         */


        showMessage(message, type) {
          if (type === void 0) {
            type = "info";
          }

          if (this.messagesLabel) {
            this.messagesLabel.string = message;

            switch (type) {
              case "success":
                this.messagesLabel.node.color = new Color(0, 255, 0);
                break;

              case "danger":
                this.messagesLabel.node.color = new Color(255, 0, 0);
                break;

              case "warning":
                this.messagesLabel.node.color = new Color(255, 165, 0);
                break;

              default:
                this.messagesLabel.node.color = new Color(255, 255, 255);
            }
          }
        }
        /**
         * Возвращает текущее значение энергии
         */


        getCurrentEnergy() {
          return this.currentEnergy;
        }
        /**
         * Возвращает текущее количество бустов
         */


        getCurrentBoosts() {
          return this.currentBoosts;
        }
        /**
         * Активирует буст
         */


        activateBoost() {
          if (!this.socket || !this.socket.connected || !this.userId) {
            console.error("Не удалось использовать буст: сокет не подключен или userId не установлен.");
            return;
          }

          this.socket.emit("useBoost", {
            userId: this.userId
          });
          console.log("Буст активирован.");
        }
        /**
         * Обработчик события "tap"
         */


        onTap() {
          console.log("Current energy in onTap:", this.currentEnergy);

          if (!this.userId) {
            this.showMessage("Пользователь не подключен.", "danger");
            return;
          }

          if (this.currentEnergy < 13) {
            this.showMessage("Не хватает энергии для тапа.", "warning");
            return;
          }

          if (this.socket && this.socket.connected) {
            this.socket.emit("tap", {
              userId: this.userId
            });
            this.showMessage("Тап отправлен!", "info");
          } else {
            this.showMessage("Соединение с сервером отсутствует.", "danger");
          }
        }
        /**
         * Получает текущий userId
         */


        getUserId() {
          return this.userId;
        }
        /**
         * Устанавливает новый userId
         * @param id Новый ID пользователя
         */


        setUserId(id) {
          this.userId = id;

          if (this.socket && this.socket.connected) {
            this.socket.emit("register", {
              userId: this.userId
            }); // Дополнительные действия при изменении userId, если необходимо
          }
        }
        /**
         * Инициализирует пользователя (например, после логина)
         * @param id ID пользователя
         */


        initializeUser(id) {
          this.setUserId(id); // Другие действия по инициализации пользователя
        }

      }, _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "coinsLabel", [_dec2], {
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
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "boostsLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "incomeManager", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "passiveIncomeModal", [_dec8], {
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
//# sourceMappingURL=6a9a1563b2cec67e273547f75ce5f37519f08765.js.map