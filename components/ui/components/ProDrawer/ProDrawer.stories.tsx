import React, { useState } from 'react';
import { ProDrawer } from './ProDrawer';
import { DrawerProps } from '@mui/material';
import Button from '@mui/material/Button';

export default {
  title: 'ProDrawer',
  component: ProDrawer,
};

function Template({ anchor }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>open</Button>
      <ProDrawer anchor={anchor} isOpen={isOpen} setIsOpen={setIsOpen}>
        content here
      </ProDrawer>
    </>
  );
}

export const Default = Template.bind({});
Default.arg = {
  anchor: {
    control: 'radio',
    options: ['left', 'right', 'top', 'bottom'] as Array<DrawerProps['anchor']>,
  },
};
