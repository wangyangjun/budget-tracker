import { useEffect, useState } from 'react';
import { Action, BudgetItem } from './types';
import { Button, Grid, Typography } from '@mui/material';
import { BudgetSummary } from './BudgetSummary';
import { BudgetTable } from './BudgetTable';
import { BudgetEntryDialog } from './BudgetEntryDialog';
import { ConfirmDialog } from '../components/ConfirmDialog';
import useAsync, { LoadingState } from '../hooks/useAsync';
import { addBudget, getAllBudget, removeBudget, updateBudget } from './budget-client';

export const BudgetPage = () => {
  const [openBudgetDialog, setOpenBudgetDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectBudget, setSelectBudget] = useState<BudgetItem | undefined>(undefined);

  const { state: asyncState, execute } = useAsync();

  useEffect(() => {
    execute(getAllBudget);
  }, [execute]);

  const executeBudgetChange = (item: BudgetItem, action: Action) => {
    setSelectBudget(undefined);
    if (action === 'create') {
      execute(async () => addBudget(item));
    } else {
      execute(async () => updateBudget(item));
    }
  };

  const executeBudgetDelete = (item: BudgetItem) => {
    execute(async () => removeBudget(item));
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
          selectBudget && executeBudgetDelete(selectBudget);
        }}
        title="Delete Budget"
        message="Are you sure to delete this budget item?"
      />
    </>
  );
};
