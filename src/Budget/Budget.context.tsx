import React, { useEffect, FunctionComponent } from 'react';

import useAsync, { DEFAULT_ASYNC_STATE } from '../hooks/useAsync';
import { addBudget, updateBudget, removeBudget, getAllBudget } from './budget-client';
import { BudgetItem } from './types';

function useBudgets() {
  const { state: budgetState, execute } = useAsync();

  useEffect(() => {
    execute(getAllBudget);
  }, []);

  return {
    budgetState,
    refreshBudgets: () => {
      execute(() => getAllBudget());
    },
    addBudget: (budget: BudgetItem) => {
      execute(() => addBudget(budget));
    },
    updateBudget: (budget: BudgetItem) => {
      execute(() => updateBudget(budget));
    },
    removeBudget: (budget: BudgetItem) => {
      execute(() => removeBudget(budget));
    }
  };
}

const defaultState = {
  budgetState: {
    ...DEFAULT_ASYNC_STATE,
    data: [] as BudgetItem[]
  },
  refreshBudgets: () => {},
  removeBudget: (_budget: BudgetItem) => {},
  addBudget: (_budget: BudgetItem) => {},
  updateBudget: (_budget: BudgetItem) => {}
};

const BudgetContext = React.createContext(defaultState);

type BudgetProviderProps = {
  children: React.ReactElement;
};

const BudgetProvider: FunctionComponent<BudgetProviderProps> = props => {
  const state = useBudgets();
  return <BudgetContext.Provider {...props} value={state} />;
};

export default BudgetContext;
export { BudgetProvider, BudgetContext };
