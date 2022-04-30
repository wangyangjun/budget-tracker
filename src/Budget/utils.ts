import { v4 as uuidv4 } from 'uuid';
import { Currency } from './types';

export const currencies: ReadonlyArray<Currency> = [
  {
    type: 'dollar',
    symbol: '$'
  },
  {
    type: 'euro',
    symbol: '€'
  }
];

export const budgetList = [
  {
    id: uuidv4(),
    currency: 'euro',
    amount: 200,
    description: 'Monthly lunch benefit'
  },
  {
    id: uuidv4(),
    currency: 'euro',
    amount: 150,
    description: 'Monthly commuting benefit'
  },
  {
    id: uuidv4(),
    currency: 'euro',
    amount: 500,
    description: 'Monthly hotel expense in EU'
  },
  {
    id: uuidv4(),
    currency: 'dollar',
    amount: 500,
    description: 'Monthly hotel expense abroad'
  }
];
