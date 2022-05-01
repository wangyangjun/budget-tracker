import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { render, screen } from '@testing-library/react';

import { BudgetSummary } from '.';
import { budgetList } from '../utils';

describe('BudgetSummary', () => {
  it('calcute total budget correctly', () => {
    render(
      <BudgetSummary
        budgetList={[
          ...budgetList,
          {
            id: uuidv4(),
            currency: 'dollar',
            amount: 120,
            description: 'Monthly hotel expense abroad'
          }
        ]}
      />
    );
    const totalElement = screen.getByText('Total:');
    expect(totalElement).toBeInTheDocument();

    const totalEuroCount = screen.getByText('€850');
    expect(totalEuroCount).toBeInTheDocument();
    const totalDollarCount = screen.getByText('$620');
    expect(totalDollarCount).toBeInTheDocument();
  });
});
