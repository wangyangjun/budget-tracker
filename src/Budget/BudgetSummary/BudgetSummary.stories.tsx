import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { v4 as uuidv4 } from 'uuid';

import { BudgetSummary } from '.';

export default {
  title: 'Budget/BudgetSummary',
  component: BudgetSummary
} as ComponentMeta<typeof BudgetSummary>;

const Template: ComponentStory<typeof BudgetSummary> = args => <BudgetSummary {...args} />;

export const Default = Template.bind({});
Default.args = {
  budgetList: [
    {
      id: uuidv4(),
      currency: 'euro',
      amount: 200,
      description: 'Monthly lunch benefit'
    },
    {
      id: uuidv4(),
      currency: 'euro',
      amount: 150,
      description: 'Monthly commuting benefit'
    },
    {
      id: uuidv4(),
      currency: 'euro',
      amount: 500,
      description: 'Monthly hotel expense in EU'
    },
    {
      id: uuidv4(),
      currency: 'dollar',
      amount: 500,
      description: 'Monthly hotel expense abroad'
    }
  ]
};
