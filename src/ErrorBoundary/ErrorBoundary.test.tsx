import React from 'react';

import { render, screen } from '@testing-library/react';

import { ErrorBoundary } from './index';

const ComponentWithoutError = () => <div>Children rendered</div>;
const ComponentWithError = () => {
  throw new Error('Error message');

  // eslint-disable-next-line no-unreachable
  return <div>Children not rendered</div>;
};

describe('ErrorBoundary', () => {
  it('renders children without error', () => {
    render(
      <ErrorBoundary>
        <ComponentWithoutError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Children rendered')).toBeInTheDocument();
  });
  it('shows error', () => {
    render(
      <ErrorBoundary>
        <ComponentWithError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Error: Error message')).toBeInTheDocument();
    expect(screen.queryByText('Children not rendered')).not.toBeInTheDocument();
  });
});
