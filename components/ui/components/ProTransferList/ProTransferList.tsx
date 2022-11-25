import React, { useCallback, useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export function ProTransferList() {
  const [leftList, setLeftList] = React.useState<any[]>([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [rightList, setRightList] = React.useState<any[]>([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  return (
    <Stack
      spacing={2}
      justifyContent="space-between"
      alignItems="start"
      direction="row"
    >
      <Grid item flex="1">
        {/*<TransferListBlock list={leftList} />*/}
      </Grid>
      <Grid item>{/*<TransferListActions />*/}</Grid>
      <Grid item flex="1">
        {/*<TransferListBlock list={rightList} />*/}
      </Grid>
    </Stack>
  );
}
