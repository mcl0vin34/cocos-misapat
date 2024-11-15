System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Color, ProgressBar, EventTarget, IncomeManager, PassiveIncomeModal, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3, _crd, ccclass, property, SocketManager;

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
      EventTarget = _cc.EventTarget;
    }, function (_unresolved_2) {
      IncomeManager = _unresolved_2.IncomeManager;
    }, function (_unresolved_3) {
      PassiveIncomeModal = _unresolved_3.PassiveIncomeModal;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a0c39VZ6j5NRrT6cxMHqDGB", "SocketManager", undefined); // assets/scripts/SocketManager.ts


      __checkObsolete__(['_decorator', 'Component', 'Label', 'Color', 'ProgressBar', 'Node', 'EventTarget']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SocketManager", SocketManager = (_dec = ccclass("SocketManager"), _dec2 = property(Label), _dec3 = property(ProgressBar), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(_crd && IncomeManager === void 0 ? (_reportPossibleCrUseOfIncomeManager({
        error: Error()
      }), IncomeManager) : IncomeManager), _dec8 = property(_crd && PassiveIncomeModal === void 0 ? (_reportPossibleCrUseOfPassiveIncomeModal({
        error: Error()
      }), PassiveIncomeModal) : PassiveIncomeModal), _dec(_class = (_class2 = (_class3 = class SocketManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "coinsLabel", _descriptor, this);

          _initializerDefineProperty(this, "energyProgressBar", _descriptor2, this);

          _initializerDefineProperty(this, "energyValueLabel", _descriptor3, this);

          _initializerDefineProperty(this, "messagesLabel", _descriptor4, this);

          _initializerDefineProperty(this, "boostsLabel", _descriptor5, this);

          _initializerDefineProperty(this, "incomeManager", _descriptor6, this);

          _initializerDefineProperty(this, "passiveIncomeModal", _descriptor7, this);

          this.socket = null;
          this.userId = null;
          this.userData = null;
          this.maxEnergy = 2000;
          this.currentEnergy = 0;
          this.currentBoosts = 0;
          this.maxBoosts = 6;
          this.currentCoins = 0;
          // Добавление EventTarget для управления событиями
          this.eventTarget = new EventTarget();
        }

        static get instance() {
          if (!SocketManager._instance) {
            console.error("SocketManager не инициализирован. Убедитесь, что он добавлен на ноду в сцене.");
          }

          return SocketManager._instance;
        }

        // Метод для подписки на события
        on(event, callback, target) {
          this.eventTarget.on(event, callback, target);
        } // Метод для отписки от событий


        off(event, callback, target) {
          this.eventTarget.off(event, callback, target);
        }

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
          }

          if (!this.incomeManager) {
            const incomeManagerNode = this.node.scene.getChildByName("IncomeManagerNode");

            if (incomeManagerNode) {
              this.incomeManager = incomeManagerNode.getComponent(_crd && IncomeManager === void 0 ? (_reportPossibleCrUseOfIncomeManager({
                error: Error()
              }), IncomeManager) : IncomeManager);
            } else {
              console.warn("IncomeManager не найден в сцене.");
            }
          }

          this.initializeUser();
          this.showUserInfo(false);
        }

        onDestroy() {
          if (this.socket) {
            this.socket.disconnect();
          }

          if (SocketManager._instance === this) {
            SocketManager._instance = null;
          }
        }
        /**
         * Динамически загружает Telegram Web Apps SDK
         */


        loadTelegramSDK() {
          return new Promise((resolve, reject) => {
            if (window.Telegram) {
              resolve();
              return;
            }

            const script = document.createElement("script");
            script.src = "https://telegram.org/js/telegram-web-app.js";

            script.onload = () => {
              resolve();
            };

            script.onerror = () => {
              reject(new Error("Не удалось загрузить Telegram Web Apps SDK."));
            };

            document.head.appendChild(script);
          });
        }
        /**
         * Инициализирует пользователя, получая данные из Telegram WebApp API или используя моковые данные
         */


        async initializeUser() {
          try {
            var _Telegram, _tg$initDataUnsafe2;

            await this.loadTelegramSDK();
            const tg = (_Telegram = window.Telegram) == null ? void 0 : _Telegram.WebApp;

            if (tg) {
              var _tg$initDataUnsafe;

              console.log("Telegram WebApp API доступен");
              console.log(tg.initDataUnsafe); // Ждём, пока Telegram WebApp будет готов

              await new Promise(resolve => {
                tg.ready();
                resolve();
              });
              console.log("tg.initDataUnsafe после готовности:", tg.initDataUnsafe); // Применяем настройки Telegram WebApp

              tg.expand == null || tg.expand();
              tg.disableVerticalSwipes == null || tg.disableVerticalSwipes();
              tg.isVerticalSwipesEnabled = false;
              tg.setBackgroundColor == null || tg.setBackgroundColor("#272727");

              if (tg != null && tg.web_app_setup_swipe_behavior) {
                tg.web_app_setup_swipe_behavior({
                  allow_vertical_swipe: false
                });
              }

              if ((_tg$initDataUnsafe = tg.initDataUnsafe) != null && (_tg$initDataUnsafe = _tg$initDataUnsafe.user) != null && _tg$initDataUnsafe.id) {
                const userData = {
                  id: tg.initDataUnsafe.user.id,
                  username: tg.initDataUnsafe.user.username,
                  first_name: tg.initDataUnsafe.user.first_name,
                  last_name: tg.initDataUnsafe.user.last_name || "",
                  language_code: tg.initDataUnsafe.user.language_code || "",
                  is_premium: tg.initDataUnsafe.user.is_premium || false,
                  photo_url: tg.initDataUnsafe.user.photo_url || "",
                  full_name: `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name || ""}`
                };
                console.log("Данные пользователя Telegram:", userData);
                this.userId = userData.id;
                this.userData = userData;
              } else {
                console.warn("Данные пользователя не найдены в tg.initDataUnsafe.");
                this.useMockData();
              }
            } else {
              console.warn("Telegram WebApp недоступен. Используем моковые данные.");
              this.useMockData();
            } // Продолжаем инициализацию


            await this.createOrUpdateUser(this.userData);
            await this.fetchInitialData();
            this.autoConnect();
            this.showUserInfo(true);
            await this.checkPassiveIncome(); // Добавлено для немедленной проверки пассивного дохода
            // Обработка реферальных параметров

            if (tg && (_tg$initDataUnsafe2 = tg.initDataUnsafe) != null && _tg$initDataUnsafe2.start_param) {
              const startParam = tg.initDataUnsafe.start_param;
              console.log("start_param:", startParam);

              if (startParam.startsWith("refId")) {
                const referrerId = startParam.replace("refId", "");
                const referralId = this.userId;

                if (referralId && referrerId && referralId.toString() !== referrerId) {
                  try {
                    const response = await fetch(`https://dev.simatap.ru/api/referrals?referrer_id=${referrerId}&referral_id=${referralId}`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({})
                    });

                    if (response.ok) {
                      console.log("Реферал успешно зарегистрирован.");
                    } else {
                      const data = await response.json();

                      if (data.message === "Такая запись о реферале уже существует") {
                        console.log("Реферал уже существует.");
                      } else {
                        console.error("Ошибка при регистрации реферала:", data.message);
                      }
                    }
                  } catch (error) {
                    console.error("Ошибка при регистрации реферала:", error);
                  }
                }
              }
            } // Эмитируем событие завершения инициализации пользователя


            this.eventTarget.emit("userInitialized");
          } catch (error) {
            console.error("Ошибка при инициализации пользователя:", error);
          }
        }

        useMockData() {
          const userData = {
            id: 422840434,
            username: "ceo bro's",
            first_name: "madesta",
            last_name: "",
            language_code: "en",
            is_premium: false,
            photo_url: "",
            full_name: "Test User"
          };
          this.userId = userData.id;
          this.userData = userData;
          console.log(`Mock user data set. User ID: ${this.userId}`); // Эмитируем событие при использовании моковых данных

          this.eventTarget.emit("userInitialized");
        }
        /**
         * Создает или обновляет пользователя на сервере
         * @param userData Данные пользователя
         */


        async createOrUpdateUser(userData) {
          try {
            const queryParams = new URLSearchParams({
              id: userData.id.toString(),
              username: userData.username || "",
              first_name: userData.first_name || "",
              last_name: userData.last_name || ""
            });
            const postResponse = await fetch(`https://dev.simatap.ru/api/users?${queryParams.toString()}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({})
            });

            if (!postResponse.ok) {
              throw new Error(`Ошибка при отправке POST запроса: ${postResponse.statusText}`);
            }

            console.log("Пользователь успешно создан или обновлен.");
          } catch (error) {
            console.warn("Ошибка при создании или обновлении пользователя.", error);
          }
        }

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
              this.showUserInfo(true);
            });
            this.socket.on("disconnect", () => {
              this.showMessage("Отключено от сервера.", "danger");
              this.showUserInfo(false);
            });
            this.socket.on("energyUpdated", data => {
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
            }); // Обработчик события обновления монет

            this.socket.on("coinsUpdated", data => {
              if (data.coins !== undefined) {
                this.updateCoins(Math.round(data.coins));
              } else {
                console.warn("coinsUpdated event received, but coins is undefined.");
              }
            });
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
              console.log("Boost activation response:", data);

              if (data.newEnergyValue !== undefined) {
                this.updateEnergy(Math.round(data.newEnergyValue));
              }
            }); // Обработчик ошибки при активации буста

            this.socket.on("boostError", data => {
              console.error("Ошибка активации буста:", data.message);
            });
          } catch (error) {
            this.showMessage("Ошибка подключения к серверу.", "danger");
            console.error("Socket connection error:", error);
          }
        }

        async fetchInitialData() {
          try {
            const response = await fetch(`https://dev.simatap.ru/api/users/${this.userId}`);

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("API response:", data);

            if (data.energy_left !== undefined) {
              this.updateEnergy(Math.round(data.energy_left));
              console.log(`Initial energy fetched: ${Math.round(data.energy_left)}`);
            } else {
              console.warn("Energy data not found in API response.");
            }

            if (data.boosts_left !== undefined) {
              this.updateBoosts(data.boosts_left);
              console.log(`Initial boosts fetched: ${data.boosts_left}`);
            } else {
              console.warn("Boosts data not found in API response.");
            }

            await this.fetchTotalCoins();
          } catch (error) {
            console.error("Error fetching initial data:", error);
          }
        }
        /**
         * Получает общее количество монет пользователя
         */


        async fetchTotalCoins() {
          try {
            const response = await fetch(`https://dev.simatap.ru/api/totalCoins/${this.userId}`);

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.coins !== undefined) {
              this.updateCoins(Math.round(data.coins));
              console.log(`Total coins fetched: ${Math.round(data.coins)}`);
            } else {
              console.warn("Coins data not found in API response.");
            }
          } catch (error) {
            console.warn("Ошибка при получении количества монет. Используем значение по умолчанию 0.", error);
            this.updateCoins(0);
          }
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


        async checkPassiveIncome() {
          const income = await this.fetchPassiveIncome();

          if (income > 0) {
            if (this.passiveIncomeModal) {
              this.passiveIncomeModal.show(income);
            } else {
              console.warn("PassiveIncomeModal не назначен в SocketManager.");
            }

            this.currentCoins += income;
            this.updateCoins(this.currentCoins);
          } else {// Если вы хотите открывать окно даже при нулевом доходе, раскомментируйте ниже
            // if (this.passiveIncomeModal) {
            //   this.passiveIncomeModal.show(0); // Или другой параметр по вашему усмотрению
            // }
          }
        }
        /**
         * Получает пассивный доход с сервера и возвращает его
         */


        async fetchPassiveIncome() {
          try {
            const response = await fetch(`https://dev.simatap.ru/api/passiveIncome?userId=${this.userId}`);

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
            }

            const data = await response.json();
            console.log("Passive income API response:", data);

            if ("passive_income_earned" in data) {
              const income = Math.round(data.passive_income_earned);
              console.log(`Пассивный доход получен: ${income}`);
              return income;
            } else if ("message" in data) {
              console.log(`Сообщение от сервера: ${data.message}`);
              return 0;
            } else {
              console.warn("Неизвестный формат ответа от сервера:", data);
              return 0;
            }
          } catch (error) {
            console.error("Ошибка при получении пассивного дохода:", error);
            return 0;
          }
        }
        /**
         * Обновляет количество бустов и соответствующую метку.
         * @param boostsLeft Текущее количество оставшихся бустов.
         */


        updateBoosts(boostsLeft) {
          this.currentBoosts = boostsLeft;

          if (this.boostsLabel) {
            this.boostsLabel.string = `${this.currentBoosts}/${this.maxBoosts}`;
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
          const progress = currentEnergy / this.maxEnergy;
          this.energyProgressBar.progress = progress;
          this.energyValueLabel.string = `${currentEnergy}/${this.maxEnergy}`;
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


        showMessage(message, type = "info") {
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


        async onTap() {
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
            this.showMessage("Тап отправлен!", "info"); // Добавляем вибрацию при клике

            this.triggerHapticFeedback();
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
            });
          }
        }
        /**
         * Инициирует вибрацию через Telegram WebApp
         */


        triggerHapticFeedback() {
          var _Telegram2;

          const tg = (_Telegram2 = window.Telegram) == null ? void 0 : _Telegram2.WebApp;

          if (tg && tg.HapticFeedback) {
            tg.HapticFeedback.impactOccurred("medium");
          } else {
            console.warn("HapticFeedback API недоступен.");
          }
        }

      }, _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "coinsLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "energyProgressBar", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "energyValueLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "messagesLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "boostsLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "incomeManager", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "passiveIncomeModal", [_dec8], {
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
//# sourceMappingURL=6a9a1563b2cec67e273547f75ce5f37519f08765.js.map