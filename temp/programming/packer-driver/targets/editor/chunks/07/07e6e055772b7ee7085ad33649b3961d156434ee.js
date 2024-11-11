System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, SocketManager, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, IncomeManager;

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
      Label = _cc.Label;
    }, function (_unresolved_2) {
      SocketManager = _unresolved_2.SocketManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a3599luME5HILUcjWVa3vL6", "IncomeManager", undefined); // assets/scripts/Income/IncomeManager.ts


      __checkObsolete__(['_decorator', 'Component', 'Label']);

      // Импортируйте SocketManager
      ({
        ccclass,
        property
      } = _decorator);

      _export("IncomeManager", IncomeManager = (_dec = ccclass("IncomeManager"), _dec2 = property(Label), _dec(_class = (_class2 = class IncomeManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "incomeLabel", _descriptor, this);

          // Метка для отображения суммы дохода
          this.apiUrl = "https://dev.simatap.ru/api/upgrades";
        }

        start() {
          if (!this.incomeLabel) {
            console.error("incomeLabel не назначен в IncomeManager.");
            return;
          } // Убедитесь, что SocketManager инициализирован


          if (!(_crd && SocketManager === void 0 ? (_reportPossibleCrUseOfSocketManager({
            error: Error()
          }), SocketManager) : SocketManager).instance) {
            console.error("SocketManager не инициализирован.");
            this.updateIncomeLabel("+ 0 доход в час");
            return;
          }

          this.fetchIncomeData();
        }
        /**
         * Получает данные с API и обновляет метку дохода
         */


        async fetchIncomeData() {
          const userId = (_crd && SocketManager === void 0 ? (_reportPossibleCrUseOfSocketManager({
            error: Error()
          }), SocketManager) : SocketManager).instance.getUserId();

          if (!userId) {
            console.error("userId не установлен в SocketManager.");
            this.updateIncomeLabel("+ 0 доход в час");
            return;
          }

          try {
            const response = await fetch(`${this.apiUrl}?userId=${userId}`);

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const totalIncome = this.calculateTotalIncome(data);
            const formattedIncome = this.formatIncome(totalIncome);
            this.updateIncomeLabel(formattedIncome);
            console.log(`Общий доход: ${formattedIncome}`);
          } catch (error) {
            console.error("Ошибка при получении данных с API:", error);
            this.updateIncomeLabel("+ 0 доход в час"); // Устанавливаем 0 доход в случае ошибки
          }
        }
        /**
         * Складывает cumulative_income всех объектов
         * @param upgrades Массив объектов Upgrade
         * @returns Общая сумма дохода
         */


        calculateTotalIncome(upgrades) {
          return upgrades.reduce((sum, upgrade) => sum + (upgrade.cumulative_income || 0), 0);
        }
        /**
         * Форматирует сумму до тысяч с добавлением 'K' и префикса '+', суффикса 'доход в час'
         * @param income Сумма дохода
         * @returns Форматированная строка
         */


        formatIncome(income) {
          if (income >= 1000) {
            return `+ ${(income / 1000).toFixed(0)}K доход в час`;
          }

          return `+ ${income} доход в час`;
        }
        /**
         * Обновляет текст метки дохода
         * @param text Текст для отображения
         */


        updateIncomeLabel(text) {
          this.incomeLabel.string = text;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "incomeLabel", [_dec2], {
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
//# sourceMappingURL=07e6e055772b7ee7085ad33649b3961d156434ee.js.map