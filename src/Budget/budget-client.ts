import { BudgetItem, isBudgetItem } from './types';
import { budgetList } from './utils';

const BUDGET_KEY = 'budget-tracker-local-data';

export const getAllBudget = async (): Promise<Array<BudgetItem>> => {
  await new Promise(r => setTimeout(r, 1000));

  const value = localStorage.getItem(BUDGET_KEY);
  if (value !== null) {
    const items = JSON.parse(value);
    if (Array.isArray(items) && items.every(item => isBudgetItem(item))) {
      return items;
    }
  }

  localStorage.setItem(BUDGET_KEY, JSON.stringify(budgetList));
  return budgetList;
};

export const addBudget = async (budget: BudgetItem): Promise<Array<BudgetItem>> => {
  const list = await getAllBudget();
  const updateList = [...list, budget];
  localStorage.setItem(BUDGET_KEY, JSON.stringify(updateList));
  return updateList;
};

export const updateBudget = async (budget: BudgetItem): Promise<Array<BudgetItem>> => {
  const list = await getAllBudget();
  const existIndex = list.findIndex(item => item.id === budget.id);
  if (existIndex < 0) {
    Promise.reject('No such budget record exists');
  }
  list[existIndex] = budget;
  localStorage.setItem(BUDGET_KEY, JSON.stringify(list));
  return list;
};

export const removeBudget = async (budget: BudgetItem): Promise<ReadonlyArray<BudgetItem>> => {
  const list = await getAllBudget();
  const existIndex = list.findIndex(item => item.id === budget.id);
  if (existIndex < 0) {
    Promise.reject('No such budget record exists');
  }
  list.splice(existIndex, 1);
  localStorage.setItem(BUDGET_KEY, JSON.stringify(list));
  return list;
};
