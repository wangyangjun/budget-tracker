import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { render, screen } from '@testing-library/react';

import { BudgetSummary } from '.';

const budgetList = [
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
  },
  {
    id: uuidv4(),
    currency: 'dollar',
    amount: 120,
    description: 'Monthly hotel expense abroad'
  }
];

describe('BudgetSummary', () => {
  it('calcute total budget correctly', () => {
    render(<BudgetSummary budgetList={budgetList} />);
    const totalElement = screen.getByText('Total:');
    expect(totalElement).toBeInTheDocument();

    const totalEuroCount = screen.getByText('€850');
    expect(totalEuroCount).toBeInTheDocument();
    const totalDollarCount = screen.getByText('$620');
    expect(totalDollarCount).toBeInTheDocument();
  });
});
