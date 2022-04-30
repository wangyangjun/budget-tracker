import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { ErrorBoundary } from './index';
import { Typography } from '@mui/material';

const ComponentWithError = () => {
  throw new Error('Error message');
};

export default {
  title: 'ErrorBoundary',
  component: ErrorBoundary
} as ComponentMeta<typeof ErrorBoundary>;

export const Default = () => (
  <div>
    <ErrorBoundary>
      <ComponentWithError />
    </ErrorBoundary>
    <Typography>Text out side ErrorBoundary</Typography>
  </div>
);
