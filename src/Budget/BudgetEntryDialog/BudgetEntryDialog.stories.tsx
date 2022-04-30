import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BudgetEntryDialog } from '.';

export default {
  title: 'Components/BudgetEntryDialog',
  component: BudgetEntryDialog
} as ComponentMeta<typeof BudgetEntryDialog>;

const Template: ComponentStory<typeof BudgetEntryDialog> = args => (
  <BudgetEntryDialog {...args} />
);

export const Update = Template.bind({});
Update.args = {
  open: true,
  item: { currency: 'euro', amount: 200, description: 'Montly lunch benefit' }
};

export const Create = Template.bind({});
Create.args = {
  open: true
};
