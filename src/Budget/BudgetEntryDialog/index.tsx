import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import isEqual from 'lodash/isEqual';
import { v4 as uuidv4 } from 'uuid';
import styled from '@emotion/styled';

import { Action, BudgetItem, Currency } from '../types';

import { currencies } from '../utils';

interface BudgetEntryDialogProps {
  open: boolean;
  onClose: () => void;
  item?: BudgetItem;
  onChange?: (item: BudgetItem, action: Action) => void;
}

const LocalFormControl = styled(FormControl)`
  box-sizing: border-box;
`;

const LocalDialogTitle = styled(DialogTitle)`
  text-transform: capitalize;
`;

export const BudgetEntryDialog = ({ open, onClose, item, onChange }: BudgetEntryDialogProps) => {
  const [currency, setCurrency] = useState<Currency['type'] | undefined>(item?.currency);
  const [amount, setAmount] = useState<number | undefined>(item?.amount);
  const [description, setDescription] = useState<string | undefined>(item?.description);

  useEffect(() => {
    setCurrency(item?.currency);
    setAmount(item?.amount);
    setDescription(item?.description);
  }, [item]);

  const entry = useMemo(() => {
    if (!!currency && !!amount && !!description) {
      return { currency, amount, description };
    }
    return undefined;
  }, [currency, amount, description]);

  const action = item ? 'update' : 'create';
  return (
    <Dialog open={open} onClose={onClose}>
      <LocalDialogTitle>{`${action} Budget Entry`}</LocalDialogTitle>
      <DialogContent>
        <div>
          <FormControl required sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="currency-select-label">currency</InputLabel>
            <Select
              value={currency ?? ''}
              onChange={event => setCurrency(event.target.value)}
              label="currency"
              autoWidth
            >
              {currencies.map(currency => (
                <MenuItem key={currency.type} value={currency.type}>
                  {currency.symbol}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1 }}>
            <TextField
              id="budget-amount"
              label="amount"
              type="number"
              required
              error={!!amount && amount < 0}
              helperText={!!amount && amount < 0 ? 'amount cannot be less than 0' : undefined}
              size="small"
              InputLabelProps={{
                shrink: true
              }}
              value={amount ?? ''}
              onChange={event => setAmount(Number(event.target.value))}
            />
          </FormControl>
        </div>
        <div>
          <LocalFormControl sx={{ p: 1 }} fullWidth>
            <TextField
              id="budget-amount"
              label="description"
              multiline
              rows={3}
              required
              size="small"
              value={description}
              InputLabelProps={{
                shrink: true
              }}
              onChange={event => setDescription(event.target.value)}
            />
          </LocalFormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          disabled={!entry || isEqual(entry, item)}
          onClick={() => {
            if (!!entry && onChange) {
              onChange({ ...entry, id: item?.id ?? uuidv4() }, action);
              onClose();
            }
          }}
        >
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
