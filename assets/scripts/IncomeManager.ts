// assets/scripts/Income/IncomeManager.ts

import { _decorator, Component, Label } from "cc";
import { SocketManager } from "./SocketManager"; // Импортируйте SocketManager
const { ccclass, property } = _decorator;

interface Upgrade {
  upgrade_id: number;
  name: string;
  description: string;
  url: string;
  current_level: number;
  next_level: number | null;
  next_level_cost: number | null;
  income_increase_per_level: number;
  cumulative_income: number;
}

@ccclass("IncomeManager")
export class IncomeManager extends Component {
  @property(Label)
  incomeLabel: Label = null; // Метка для отображения суммы дохода

  private apiUrl: string = "https://dev.simatap.ru/api/upgrades";

  start() {
    if (!this.incomeLabel) {
      console.error("incomeLabel не назначен в IncomeManager.");
      return;
    }

    // Убедитесь, что SocketManager инициализирован
    if (!SocketManager.instance) {
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
    const userId = SocketManager.instance.getUserId();
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

      const data: Upgrade[] = await response.json();
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
  calculateTotalIncome(upgrades: Upgrade[]): number {
    return upgrades.reduce(
      (sum, upgrade) => sum + (upgrade.cumulative_income || 0),
      0
    );
  }

  /**
   * Форматирует сумму до тысяч с добавлением 'K' и префикса '+', суффикса 'доход в час'
   * @param income Сумма дохода
   * @returns Форматированная строка
   */
  formatIncome(income: number): string {
    if (income >= 1000) {
      return `+ ${(income / 1000).toFixed(0)}K доход в час`;
    }
    return `+ ${income} доход в час`;
  }

  /**
   * Обновляет текст метки дохода
   * @param text Текст для отображения
   */
  updateIncomeLabel(text: string) {
    this.incomeLabel.string = text;
  }
}
