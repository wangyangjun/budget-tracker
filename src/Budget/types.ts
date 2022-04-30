export type Currency = {
  type: string;
  symbol: string;
};

export type BudgetItem = {
  currency: Currency['type'];
  amount: number;
  description: string;
};

export type Action = 'create' | 'update';
