import React from 'react';
import { groupBy } from 'lodash';
import { BudgetList } from '../types';
import { Stack, Typography } from '@mui/material';
import { currencies } from '../utils';

interface BudgetSummaryProps {
  budgetList: BudgetList;
}

export const BudgetSummary = ({ budgetList }: BudgetSummaryProps) => {
  const groupedBudet = groupBy(budgetList, 'currency');
  return (
    <Stack direction="row" spacing={2}>
      <Typography variant="h4" gutterBottom component="div">
        Total:
      </Typography>
      {Object.keys(groupedBudet).map((currency, index) => (
        <Typography key={index} variant="h4" gutterBottom component="div">
          {currencies.find(c => c.type === currency)?.symbol}
          {groupedBudet[currency].reduce((amount, item) => amount + item.amount, 0)}
        </Typography>
      ))}
    </Stack>
  );
};
