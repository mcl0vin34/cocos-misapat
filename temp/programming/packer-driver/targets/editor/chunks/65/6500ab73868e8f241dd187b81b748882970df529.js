System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, ScrollView, Prefab, instantiate, Label, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, FriendsPage;

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

      _cclegacy._RF.push({}, "829ce7RYglPV6kmQF/Wbmbm", "FriendsPage", undefined); // assets/scripts/FriendsPage.ts


      __checkObsolete__(['_decorator', 'Component', 'ScrollView', 'Prefab', 'instantiate', 'Label', 'Vec3', 'Color']);

      ({
        ccclass,
        property
      } = _decorator); // Интерфейс для Друга

      _export("FriendsPage", FriendsPage = (_dec = ccclass('FriendsPage'), _dec2 = property(ScrollView), _dec3 = property(Prefab), _dec4 = property(Label), _dec(_class = (_class2 = class FriendsPage extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "scrollView", _descriptor, this);

          _initializerDefineProperty(this, "friendItemPrefab", _descriptor2, this);

          _initializerDefineProperty(this, "totalFriendsLabel", _descriptor3, this);

          _initializerDefineProperty(this, "apiBaseUrl", _descriptor4, this);

          this.userId = 777270195;
        }

        // Замените на актуальный userId или получите его из других источников
        start() {
          this.fetchFriends();
        }

        async fetchFriends() {
          try {
            const response = await fetch(`${this.apiBaseUrl}/${this.userId}`);

            if (!response.ok) {
              if (response.status === 404) {
                this.totalFriendsLabel.string = `У тебя пока нет друзей`;
                return;
              }

              throw new Error('Network response was not ok');
            }

            const friends = await response.json();
            console.log('Fetched friends:', friends);
            this.totalFriendsLabel.string = `У тебя ${friends.length} друзей`;
            this.populateFriendsList(friends);
          } catch (error) {
            console.error('Ошибка при загрузке списка друзей:', error);
            this.totalFriendsLabel.string = 'Не удалось загрузить список друзей.';
          }
        }

        populateFriendsList(friends) {
          const content = this.scrollView.content;
          console.log('Populating friends list with', friends.length, 'friends.'); // Очистить предыдущие элементы

          content.removeAllChildren();
          friends.forEach((friend, index) => {
            console.log(`Adding friend ${index + 1}:`, friend);
            const friendItem = instantiate(this.friendItemPrefab);
            friendItem.parent = content; // Получить все Label компоненты в friendItem

            const labels = friendItem.getComponentsInChildren(Label);
            console.log(`Found ${labels.length} Label components in FriendItem.`);
            let usernameLabel = null;
            let numberLabel = null;
            let coinsLabel = null;
            labels.forEach(label => {
              const nodeName = label.node.name;

              if (nodeName === 'UsernameLabel') {
                usernameLabel = label;
              } else if (nodeName === 'NumberLabel') {
                numberLabel = label;
              } else if (nodeName === 'CoinsLabel') {
                coinsLabel = label;
              }
            });

            if (usernameLabel && numberLabel && coinsLabel) {
              usernameLabel.string = friend.username;
              numberLabel.string = `${index + 1}.`;
              coinsLabel.string = this.formatCoins(friend.coins);
              console.log(`Set Username: ${friend.username}, Number: ${index + 1}, Coins: ${friend.coins}`);
            } else {
              console.warn('Не удалось найти один из Label компонентов в FriendItem');
              console.log('Найденные Label узлы:', labels.map(label => label.node.name));
            }
          });
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
            return Math.round(coins).toLocaleString();
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "friendItemPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "totalFriendsLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "apiBaseUrl", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 'https://dev.simatap.ru/api/referrals';
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6500ab73868e8f241dd187b81b748882970df529.js.map