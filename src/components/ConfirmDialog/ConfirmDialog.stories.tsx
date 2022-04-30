import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ConfirmDialog } from '.';

export default {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog
} as ComponentMeta<typeof ConfirmDialog>;

const Template: ComponentStory<typeof ConfirmDialog> = args => {
  const [open, setOpen] = useState(args.open);
  return <ConfirmDialog {...args} open={open} onClose={() => setOpen(false)} />;
};

export const Default = Template.bind({});
Default.args = {
  open: true,
  title: 'Confirm',
  message: 'Do you want delete this budget?'
};
