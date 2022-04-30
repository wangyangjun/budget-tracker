import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BudgetPage } from '.';

export default {
  title: 'Budget/BudgetPage',
  component: BudgetPage
} as ComponentMeta<typeof BudgetPage>;

const Template: ComponentStory<typeof BudgetPage> = () => <BudgetPage />;

export const Default = Template.bind({});
