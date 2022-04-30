import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConfirmDialog } from '.';

describe('ConfirmDialog', () => {
  it('render title and message in dialog', () => {
    const onClose = jest.fn();
    const title = 'Confirm delete this item';
    const message = 'Do you really really want do this?';
    render(<ConfirmDialog open={true} onClose={onClose} title={title} message={message} />);
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();
  });

  it('close dialog', () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const title = 'Confirm delete this item';
    const message = 'Do you really really want do this?';
    render(<ConfirmDialog open={true} onClose={onClose} title={title} message={message} onConfirm={onConfirm} />);
    userEvent.click(screen.getByText('Cancel'));

    expect(onClose).toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('confirm', () => {
    const onClose = jest.fn();
    const onConfirm = jest.fn();
    const title = 'Confirm delete this item';
    const message = 'Do you really really want do this?';
    render(<ConfirmDialog open={true} onClose={onClose} title={title} message={message} onConfirm={onConfirm} />);
    userEvent.click(screen.getByText('Confirm'));

    expect(onConfirm).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
