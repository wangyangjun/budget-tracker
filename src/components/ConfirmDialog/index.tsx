import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm?: () => void;
}

export const ConfirmDialog = ({ open, onClose, title, message, onConfirm }: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            onConfirm && onConfirm();
            onClose();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
