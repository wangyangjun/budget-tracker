import React, { ErrorInfo, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

type ErrorBoundaryState = {
  hasError?: boolean;
  error?: Error;
  reactErrorInfo?: ErrorInfo;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, reactErrorInfo: ErrorInfo): void {
    this.setState({
      hasError: true,
      error,
      reactErrorInfo
    });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      const { error, reactErrorInfo } = this.state;
      let message = reactErrorInfo?.componentStack;

      return (
        <Box>
          <Typography variant="h4" gutterBottom>
            {error?.toString() || 'Uncaught error'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {message || 'Something went wrong'}
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}
