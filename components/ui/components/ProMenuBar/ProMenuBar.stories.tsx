import React from 'react';
import { ProMenuBar } from './ProMenuBar';
import Box from '@mui/material/Box';

export default {
  title: 'ProMenuBar',
  component: ProMenuBar,
};

export function Default() {
  return (
    <Box width={'100px'}>
      <ProMenuBar
        opened={true}
        menu={[
          {
            text: 'item0',
            children: [{ text: 'item0-0', to: '/' }],
          },
        ]}
      />
    </Box>
  );
}
