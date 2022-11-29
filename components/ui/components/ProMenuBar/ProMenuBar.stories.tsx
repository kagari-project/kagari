import React from 'react';
import { ProMenuBar } from './ProMenuBar';
import Box from '@mui/material/Box';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'ProMenuBar',
  component: ProMenuBar,
};

export function Default() {
  return (
    <Router>
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
    </Router>
  );
}
