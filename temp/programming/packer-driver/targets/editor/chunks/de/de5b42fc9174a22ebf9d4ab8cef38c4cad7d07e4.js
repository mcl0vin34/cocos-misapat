System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, ScrollView, Prefab, instantiate, Label, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, LeaderBoardPage;

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
      ScrollView = _cc.ScrollView;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Label = _cc.Label;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "509aaKVAOZOU4SArmn1DqkK", "LeadersPage", undefined); // assets/scripts/LeaderBoard/LeaderBoardPage.ts


      __checkObsolete__(['_decorator', 'Component', 'ScrollView', 'Prefab', 'instantiate', 'Label', 'Vec3', 'Color']);

      ({
        ccclass,
        property
      } = _decorator); // Интерфейс для Лидера
      // Интерфейс для ответа API

      _export("LeaderBoardPage", LeaderBoardPage = (_dec = ccclass('LeaderBoardPage'), _dec2 = property(ScrollView), _dec3 = property(Prefab), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Label), _dec(_class = (_class2 = class LeaderBoardPage extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "scrollView", _descriptor, this);

          _initializerDefineProperty(this, "leaderItemPrefab", _descriptor2, this);

          // Удаляем свойство totalLeadersLabel
          // @property(Label)
          // totalLeadersLabel: Label = null;
          // Добавляем новые свойства для текущего игрока
          _initializerDefineProperty(this, "currentRankLabel", _descriptor3, this);

          _initializerDefineProperty(this, "currentUsernameLabel", _descriptor4, this);

          _initializerDefineProperty(this, "currentCoinsLabel", _descriptor5, this);

          _initializerDefineProperty(this, "apiBaseUrl", _descriptor6, this);

          this.userId = 777270195;
        }

        // Замените на актуальный userId или получите его из других источников
        start() {
          this.fetchLeaders();
        }
        /**
         * Получает список лидеров из API
         */


        async fetchLeaders() {
          try {
            const response = await fetch(`${this.apiBaseUrl}?userId=${this.userId}`);

            if (!response.ok) {
              if (response.status === 404) {
                // Если топ-лидеров нет, можно скрыть список или показать сообщение
                console.warn('Топ-лидеров пока нет.');
                return;
              }

              throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Fetched leaderboard data:', data); // Убираем строку с общим количеством лидеров
            // this.totalLeadersLabel.string = `Топ-50 лидеров: ${data.top50.length}`;

            this.populateLeadersList(data.top50); // Отображаем информацию о текущем игроке

            if (data.currentUser) {
              this.displayCurrentUser(data.currentUser);
            } // Прокрутка ScrollView к началу после заполнения списка


            if (this.scrollView) {
              this.scrollView.scrollToTop(0, false); // Альтернативный способ:
              // this.scrollView.content.setPosition(new Vec3(0, 0, 0));
            }
          } catch (error) {
            console.error('Ошибка при загрузке списка лидеров:', error); // Убираем строку с общим количеством лидеров и показываем ошибку
            // if (this.totalLeadersLabel) {
            //     this.totalLeadersLabel.string = 'Не удалось загрузить список лидеров.';
            // }
          }
        }
        /**
         * Заполняет ScrollView списком лидеров
         * @param leaders Список лидеров
         */


        populateLeadersList(leaders) {
          const content = this.scrollView.content;
          console.log('Populating leaderboard list with', leaders.length, 'leaders.'); // Очистить предыдущие элементы

          content.removeAllChildren();
          leaders.forEach((leader, index) => {
            console.log(`Adding leader ${leader.rank}:`, leader);
            const leaderItem = instantiate(this.leaderItemPrefab);
            leaderItem.parent = content; // Получить все Label компоненты в leaderItem

            const labels = leaderItem.getComponentsInChildren(Label);
            console.log(`Found ${labels.length} Label components in LeaderItem.`);
            let numberLabel = null;
            let usernameLabel = null;
            let coinsLabel = null;
            labels.forEach(label => {
              const nodeName = label.node.name;

              if (nodeName === 'NumberLabel') {
                // Используем NumberLabel
                numberLabel = label;
              } else if (nodeName === 'UsernameLabel') {
                usernameLabel = label;
              } else if (nodeName === 'CoinsLabel') {
                coinsLabel = label;
              }
            });

            if (numberLabel && usernameLabel && coinsLabel) {
              numberLabel.string = `#${leader.rank}`;
              usernameLabel.string = leader.username;
              coinsLabel.string = this.formatCoins(leader.coins);
              console.log(`Set Number: ${leader.rank}, Username: ${leader.username}, Coins: ${leader.coins}`);
            } else {
              console.warn('Не удалось найти один из Label компонентов в LeaderItem');
              console.log('Найденные Label узлы:', labels.map(label => label.node.name));
            }
          });
        }
        /**
         * Отображает информацию о текущем игроке в отдельных метках
         * @param user Информация о текущем игроке
         */


        displayCurrentUser(user) {
          if (this.currentRankLabel) {
            this.currentRankLabel.string = `#${user.rank}`;
          } else {
            console.warn('currentRankLabel не назначен в LeaderBoardPage.');
          }

          if (this.currentUsernameLabel) {
            this.currentUsernameLabel.string = `${user.username}`;
          } else {
            console.warn('currentUsernameLabel не назначен в LeaderBoardPage.');
          }

          if (this.currentCoinsLabel) {
            this.currentCoinsLabel.string = `${this.formatCoins(user.coins)}`;
          } else {
            console.warn('currentCoinsLabel не назначен в LeaderBoardPage.');
          }
        }
        /**
         * Форматирует количество монет.
         * Если монет >= 1,000,000, отображает в миллионах с буквой "M" без пробела.
         * Иначе, отображает количество монет с разделителями тысяч и округляет до целого числа.
         * @param coins Количество монет
         * @returns Отформатированная строка
         */


        formatCoins(coins) {
          if (coins >= 1000000) {
            const millions = Math.round(coins / 1000000);
            return `${millions}M`;
          } else {
            return Math.round(coins).toLocaleString('ru-RU'); // Указываем локаль для правильного форматирования
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "leaderItemPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "currentRankLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "currentUsernameLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "currentCoinsLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "apiBaseUrl", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 'https://dev.simatap.ru/api/users/leaders';
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=de5b42fc9174a22ebf9d4ab8cef38c4cad7d07e4.js.map