import React, { PropsWithChildren } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { DrawerProps } from '@mui/material';

export type ProDrawerProps = {
  anchor: DrawerProps['anchor'];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ProDrawer(props: PropsWithChildren<ProDrawerProps>) {
  return (
    <SwipeableDrawer
      anchor={props.anchor}
      open={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      onOpen={() => props.setIsOpen(true)}
    >
      {props.children}
    </SwipeableDrawer>
  );
}
