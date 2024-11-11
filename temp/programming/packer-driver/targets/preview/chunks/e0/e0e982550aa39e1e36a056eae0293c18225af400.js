System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Label, Color, tween, UIOpacity, Vec3, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _crd, ccclass, property, TabBarController;

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
      Color = _cc.Color;
      tween = _cc.tween;
      UIOpacity = _cc.UIOpacity;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "40497KNIRZM96W3FB/cr0rR", "TabBarController", undefined); // TabBarController.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'Color', 'tween', 'UIOpacity', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TabBarController", TabBarController = (_dec = ccclass('TabBarController'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Node), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(Node), _dec12 = property(Label), _dec13 = property(Label), _dec14 = property(Label), _dec15 = property(Label), _dec16 = property(Label), _dec17 = property(Node), _dec18 = property(Node), _dec19 = property(Node), _dec20 = property(Node), _dec21 = property(Node), _dec(_class = (_class2 = class TabBarController extends Component {
        constructor() {
          super(...arguments);

          // Ссылки на страницы
          _initializerDefineProperty(this, "mainPage", _descriptor, this);

          _initializerDefineProperty(this, "friendsPage", _descriptor2, this);

          _initializerDefineProperty(this, "storePage", _descriptor3, this);

          _initializerDefineProperty(this, "leadersPage", _descriptor4, this);

          _initializerDefineProperty(this, "tasksPage", _descriptor5, this);

          // Ссылки на иконки вкладок
          _initializerDefineProperty(this, "iconHome", _descriptor6, this);

          _initializerDefineProperty(this, "iconFriends", _descriptor7, this);

          _initializerDefineProperty(this, "iconStore", _descriptor8, this);

          _initializerDefineProperty(this, "iconLeaders", _descriptor9, this);

          _initializerDefineProperty(this, "iconTasks", _descriptor10, this);

          // Ссылки на текстовые метки вкладок
          _initializerDefineProperty(this, "textHome", _descriptor11, this);

          _initializerDefineProperty(this, "textFriends", _descriptor12, this);

          _initializerDefineProperty(this, "textStore", _descriptor13, this);

          _initializerDefineProperty(this, "textLeaders", _descriptor14, this);

          _initializerDefineProperty(this, "textTasks", _descriptor15, this);

          // Ссылки на индикаторы вкладок
          _initializerDefineProperty(this, "buttonHome", _descriptor16, this);

          _initializerDefineProperty(this, "buttonFriends", _descriptor17, this);

          _initializerDefineProperty(this, "buttonLeaders", _descriptor18, this);

          _initializerDefineProperty(this, "buttonTasks", _descriptor19, this);

          // Визуальный индикатор активной вкладки "Магазин"
          _initializerDefineProperty(this, "activeButton", _descriptor20, this);

          // Текущая активная вкладка
          this.currentTab = 'home';
        }

        onLoad() {
          // Проверка всех свойств на null и логирование
          this.checkProperties(); // Инициализация: показать главную страницу без анимации

          this.showPage(this.currentTab, false); // Присоединение обработчиков событий к иконкам вкладок

          this.iconHome.on(Node.EventType.TOUCH_END, () => {
            this.showPage('home', true);
          });
          this.iconFriends.on(Node.EventType.TOUCH_END, () => {
            this.showPage('friends', true);
          });
          this.iconStore.on(Node.EventType.TOUCH_END, () => {
            this.showPage('store', true);
          });
          this.iconLeaders.on(Node.EventType.TOUCH_END, () => {
            this.showPage('leaders', true);
          });
          this.iconTasks.on(Node.EventType.TOUCH_END, () => {
            this.showPage('tasks', true);
          });
        }
        /**
         * Проверяет все свойства на null и выводит предупреждения в консоль
         */


        checkProperties() {
          var properties = [{
            name: 'mainPage',
            value: this.mainPage
          }, {
            name: 'friendsPage',
            value: this.friendsPage
          }, {
            name: 'storePage',
            value: this.storePage
          }, {
            name: 'leadersPage',
            value: this.leadersPage
          }, {
            name: 'tasksPage',
            value: this.tasksPage
          }, {
            name: 'iconHome',
            value: this.iconHome
          }, {
            name: 'iconFriends',
            value: this.iconFriends
          }, {
            name: 'iconStore',
            value: this.iconStore
          }, {
            name: 'iconLeaders',
            value: this.iconLeaders
          }, {
            name: 'iconTasks',
            value: this.iconTasks
          }, {
            name: 'textHome',
            value: this.textHome
          }, {
            name: 'textFriends',
            value: this.textFriends
          }, {
            name: 'textStore',
            value: this.textStore
          }, {
            name: 'textLeaders',
            value: this.textLeaders
          }, {
            name: 'textTasks',
            value: this.textTasks
          }, {
            name: 'buttonHome',
            value: this.buttonHome
          }, {
            name: 'buttonFriends',
            value: this.buttonFriends
          }, {
            name: 'buttonLeaders',
            value: this.buttonLeaders
          }, {
            name: 'buttonTasks',
            value: this.buttonTasks
          }, {
            name: 'activeButton',
            value: this.activeButton
          }];
          properties.forEach(prop => {
            if (!prop.value) {
              console.warn("Property \"" + prop.name + "\" is not assigned in the inspector.");
            }
          });
        }
        /**
         * Переключает видимую страницу и обновляет состояние вкладок
         * @param pageName - имя страницы ('home', 'friends', 'store', 'leaders', 'tasks')
         * @param animate - показывать ли анимацию при переключении
         */


        showPage(pageName, animate) {
          if (animate === void 0) {
            animate = true;
          }

          if (pageName === this.currentTab) return; // Скрыть текущую страницу с анимацией

          this.hidePage(this.currentTab, animate); // Показать новую страницу с анимацией

          this.showNewPage(pageName, animate); // Обновить состояние вкладок

          this.updateTabUI(pageName); // Обновить текущую вкладку

          this.currentTab = pageName;
        }
        /**
         * Скрывает указанную страницу
         * @param pageName - имя страницы для скрытия
         * @param animate - использовать ли анимацию
         */


        hidePage(pageName, animate) {
          var pageNode = this.getPageNode(pageName);

          if (pageNode) {
            var uiOpacity = pageNode.getComponent(UIOpacity);

            if (!uiOpacity) {
              console.warn("UIOpacity component not found on \"" + pageName + "\" page. Adding one.");
              uiOpacity = pageNode.addComponent(UIOpacity);
            }

            if (animate) {
              // Анимация уменьшения масштаба
              tween(pageNode).to(0.3, {
                scale: new Vec3(0.95, 0.95, 1)
              }).start(); // Анимация уменьшения прозрачности

              tween(uiOpacity).to(0.3, {
                opacity: 0
              }).call(() => {
                pageNode.active = false; // Возвращаем исходный масштаб и прозрачность для будущих показов

                pageNode.setScale(1, 1, 1);
                uiOpacity.opacity = 255;
                console.log("Page \"" + pageName + "\" \u0441\u043A\u0440\u044B\u0442\u0430.");
              }).start();
            } else {
              pageNode.active = false;
              uiOpacity.opacity = 255;
              console.log("Page \"" + pageName + "\" \u0441\u043A\u0440\u044B\u0442\u0430 \u0431\u0435\u0437 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438.");
            }
          } else {
            console.error("Page node for \"" + pageName + "\" not found.");
          }
        }
        /**
         * Показывает указанную страницу
         * @param pageName - имя страницы для показа
         * @param animate - использовать ли анимацию
         */


        showNewPage(pageName, animate) {
          var pageNode = this.getPageNode(pageName);

          if (pageNode) {
            pageNode.active = true;
            var uiOpacity = pageNode.getComponent(UIOpacity);

            if (!uiOpacity) {
              console.warn("UIOpacity component not found on \"" + pageName + "\" page. Adding one.");
              uiOpacity = pageNode.addComponent(UIOpacity);
            }

            if (animate) {
              // Устанавливаем начальные параметры для анимации
              uiOpacity.opacity = 0;
              pageNode.setScale(0.95, 0.95, 1); // Анимация увеличения прозрачности

              tween(uiOpacity).to(0.3, {
                opacity: 255
              }).start(); // Анимация увеличения масштаба

              tween(pageNode).to(0.3, {
                scale: new Vec3(1.05, 1.05, 1)
              }).to(0.3, {
                scale: new Vec3(1, 1, 1)
              }).call(() => {
                console.log("Page \"" + pageName + "\" \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u0430.");
              }).start();
            } else {
              uiOpacity.opacity = 255;
              pageNode.setScale(1, 1, 1);
              console.log("Page \"" + pageName + "\" \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u0430 \u0431\u0435\u0437 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438.");
            }
          } else {
            console.error("Page node for \"" + pageName + "\" not found.");
          }
        }
        /**
         * Возвращает ноду страницы по имени
         * @param pageName - имя страницы
         */


        getPageNode(pageName) {
          switch (pageName) {
            case 'home':
              return this.mainPage;

            case 'friends':
              return this.friendsPage;

            case 'store':
              return this.storePage;

            case 'leaders':
              return this.leadersPage;

            case 'tasks':
              return this.tasksPage;

            default:
              console.warn("Unknown page: " + pageName);
              return null;
          }
        }
        /**
         * Обновляет UI вкладок (цвет текста и индикаторы)
         * @param activePage - имя активной страницы
         */


        updateTabUI(activePage) {
          // Сбросить все цвета текстов на серый
          this.textHome.color = Color.GRAY;
          this.textFriends.color = Color.GRAY;
          this.textStore.color = Color.GRAY;
          this.textLeaders.color = Color.GRAY;
          this.textTasks.color = Color.GRAY; // Скрыть все индикаторы

          this.activeButton.active = false;
          this.buttonHome.active = false;
          this.buttonFriends.active = false;
          this.buttonLeaders.active = false;
          this.buttonTasks.active = false;

          switch (activePage) {
            case 'home':
              this.textHome.color = Color.WHITE;
              this.buttonHome.active = true;
              break;

            case 'friends':
              this.textFriends.color = Color.WHITE;
              this.buttonFriends.active = true;
              break;

            case 'store':
              this.textStore.color = Color.WHITE;
              this.activeButton.active = true;
              break;

            case 'leaders':
              this.textLeaders.color = Color.WHITE;
              this.buttonLeaders.active = true;
              break;

            case 'tasks':
              this.textTasks.color = Color.WHITE;
              this.buttonTasks.active = true;
              break;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mainPage", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "friendsPage", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "storePage", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "leadersPage", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "tasksPage", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "iconHome", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "iconFriends", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "iconStore", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "iconLeaders", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "iconTasks", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "textHome", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "textFriends", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "textStore", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "textLeaders", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "textTasks", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "buttonHome", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "buttonFriends", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "buttonLeaders", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "buttonTasks", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "activeButton", [_dec21], {
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
//# sourceMappingURL=e0e982550aa39e1e36a056eae0293c18225af400.js.map