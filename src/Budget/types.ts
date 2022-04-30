export type Currency = {
  type: string;
  symbol: string;
};

export type BudgetItem = {
  id: string;
  currency: Currency['type'];
  amount: number;
  description: string;
};

export type Action = 'create' | 'update';

export type BudgetList = ReadonlyArray<BudgetItem>;
