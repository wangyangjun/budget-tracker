import React, { useContext, useState } from 'react';
import { Action, BudgetItem } from './types';
import { Button, Grid, Typography } from '@mui/material';
import { BudgetSummary } from './BudgetSummary';
import { BudgetTable } from './BudgetTable';
import { BudgetEntryDialog } from './BudgetEntryDialog';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { LoadingState } from '../hooks/useAsync';

import { BudgetContext } from './Budget.context';

export const BudgetPage = () => {
  const [openBudgetDialog, setOpenBudgetDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectBudget, setSelectBudget] = useState<BudgetItem | undefined>(undefined);

  const {
    budgetState: asyncState,
    addBudget,
    updateBudget,
    removeBudget
  } = useContext(BudgetContext);

  const executeBudgetChange = (item: BudgetItem, action: Action) => {
    setSelectBudget(undefined);
    if (action === 'create') {
      addBudget(item);
    } else {
      updateBudget(item);
    }
  };

  const onDelete = (item: BudgetItem) => {
    setSelectBudget(item);
    setOpenConfirmDialog(true);
  };

  const onUpdate = (item: BudgetItem) => {
    setSelectBudget(item);
    setOpenBudgetDialog(true);
  };

  const onCreate = () => {
    setSelectBudget(undefined);
    setOpenBudgetDialog(true);
  };

  if (asyncState.isLoading || asyncState.loadingState === LoadingState.LOADING) {
    return <Typography>Loading ...</Typography>;
  }
  if (asyncState.loadingState === LoadingState.ERROR) {
    return <Typography>Error ...</Typography>;
  }
  if (asyncState.loadingState === LoadingState.IDLE) {
    return <Typography>Initial page</Typography>;
  }
  const budgetList = asyncState.data;

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <BudgetSummary budgetList={budgetList} />
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="row" justifyContent="flex-end">
            <Button variant="outlined" onClick={onCreate}>
              Create
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <BudgetTable budgetList={budgetList} onDelete={onDelete} onUpdate={onUpdate} />
        </Grid>
      </Grid>
      <BudgetEntryDialog
        open={openBudgetDialog}
        onClose={() => setOpenBudgetDialog(false)}
        onChange={executeBudgetChange}
        item={selectBudget}
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={() => {
          selectBudget && removeBudget(selectBudget);
        }}
        title="Delete Budget"
        message="Are you sure to delete this budget item?"
      />
    </>
  );
};
