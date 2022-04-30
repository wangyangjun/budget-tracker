import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { v4 as uuidv4 } from 'uuid';

import { BudgetEntryDialog } from '.';

export default {
  title: 'Budget/BudgetEntryDialog',
  component: BudgetEntryDialog
} as ComponentMeta<typeof BudgetEntryDialog>;

const Template: ComponentStory<typeof BudgetEntryDialog> = args => <BudgetEntryDialog {...args} />;

export const Update = Template.bind({});
Update.args = {
  open: true,
  item: {
    id: uuidv4(),
    currency: 'euro',
    amount: 200,
    description: 'Montly lunch benefit'
  }
};

export const Create = Template.bind({});
Create.args = {
  open: true
};
