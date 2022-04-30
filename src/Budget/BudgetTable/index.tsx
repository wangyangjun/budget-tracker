import React from 'react';
import { BudgetItem, BudgetList } from '../types';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

interface BudgetTableProps {
  budgetList: BudgetList;
  onDelete?: (item: BudgetItem) => void;
  onUpdate?: (item: BudgetItem) => void;
}

export const BudgetTable = ({ budgetList, onDelete, onUpdate }: BudgetTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {budgetList.map(budget => (
            <TableRow key={budget.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {budget.currency}
              </TableCell>
              <TableCell>{budget.amount}</TableCell>
              <TableCell>{budget.description}</TableCell>
              <TableCell align="center">
                <Button variant="text" onClick={() => onUpdate && onUpdate(budget)}>
                  Edit
                </Button>
                <Button variant="text" onClick={() => onDelete && onDelete(budget)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
