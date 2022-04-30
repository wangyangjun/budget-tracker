export type Currency = {
  type: string; // can be strict to 'euro' | 'dollar' | etc
  symbol: string;
};

export type BudgetItem = {
  id: string;
  currency: Currency['type'];
  amount: number;
  description: string;
};

export const isBudgetItem = (item: any): item is BudgetItem => {
  if (!('id' in item) || typeof item['id'] !== 'string') {
    return false;
  }
  if (!('currency' in item) || typeof item['currency'] !== 'string') {
    return false;
  }
  if (!('amount' in item) || typeof item['amount'] !== 'number') {
    return false;
  }
  if (!('description' in item) || typeof item['description'] !== 'string') {
    return false;
  }
  return true;
};

export type Action = 'create' | 'update';

export type BudgetList = ReadonlyArray<BudgetItem>;
