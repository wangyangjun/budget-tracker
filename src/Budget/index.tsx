import { useState } from 'react';
import { Action, BudgetItem } from './types';
import { Button, Grid } from '@mui/material';
import { budgetList } from './utils';
import { BudgetSummary } from './BudgetSummary';
import { BudgetTable } from './BudgetTable';
import { BudgetEntryDialog } from './BudgetEntryDialog';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const BudgetPage = () => {
  const [openBudgetDialog, setOpenBudgetDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectBudget, setSelectBudget] = useState<BudgetItem | undefined>(undefined);

  const onChange = (item: BudgetItem, action: Action) => {
    setSelectBudget(undefined);
    console.log(item);
    console.log(action);
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

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <BudgetSummary budgetList={budgetList} />
        </Grid>
        <Grid xs={4}>
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
        onChange={onChange}
        item={selectBudget}
      />
      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={() => {
          console.log(`Delete budget: ${selectBudget?.id}`);
        }}
        title="Delete Budget"
        message="Are you sure to delete this budget item?"
      />
    </>
  );
};
