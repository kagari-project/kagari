import React, { useRef, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ProInfiniteList, ProInfiniteListProps } from '../ProInfiniteList';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';

type Render = (item: any) => React.ReactNode;
export type PanelConfig = {
  loadMore: ProInfiniteListProps['loadMore'];
  render: Render;
  title?: string;
};
type Zone = 'left' | 'right';
type Selected = Record<Zone, any[]>;
export type OnChangeParams = { from: Zone; to: Zone; selected: Selected };

export type TransferListActionsProps = {
  selected: Selected;
  onClean: () => void;
  onChange: ProTransferListProps['onChange'];
};
export type ProTransferListProps = Record<Zone, PanelConfig> & {
  onChange: (params: OnChangeParams) => void;
};

export function TransferListActions(props: TransferListActionsProps) {
  const { selected, onChange, onClean } = props;
  return (
    <Stack
      direction="column"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100%' }}
    >
      <Button
        variant="outlined"
        size="small"
        sx={{ my: 0.5 }}
        onClick={async () => {
          await onChange({ selected, from: 'left', to: 'right' });
          onClean();
        }}
      >
        <KeyboardArrowRightIcon />
      </Button>
      <Button
        variant="outlined"
        size="small"
        sx={{ my: 0.5 }}
        onClick={async () => {
          await onChange({ selected, from: 'right', to: 'left' });
          onClean();
        }}
      >
        <KeyboardArrowLeftIcon />
      </Button>
    </Stack>
  );
}

export function ProTransferList(props: ProTransferListProps) {
  const { left, right, onChange } = props;
  const $left = useRef(null);
  const $right = useRef(null);

  const [selected, setSelected] = useState<Selected>({
    left: [],
    right: [],
  });

  function onClean() {
    setSelected({ left: [], right: [] });
    $left.current.init();
    $right.current.init();
  }

  function renderList(
    zone: 'left' | 'right',
    items: readonly any[],
    render: Render,
  ) {
    return items.map((item, i) => {
      function onChange(e) {
        const candidates = [...selected[zone]];
        if (candidates.includes(item)) {
          // uncheck
          candidates.splice(candidates.indexOf(item), 1);
        } else {
          // check
          candidates.push(item);
        }
        setSelected({
          ...selected,
          [zone]: candidates,
        });
      }

      return (
        <ListItemButton key={`#${i}-${item.id}`}>
          <ListItemIcon>
            <Checkbox
              checked={selected[zone].includes(item)}
              onChange={onChange}
            />
          </ListItemIcon>
          <ListItemText>{render(item)}</ListItemText>
        </ListItemButton>
      );
    });
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={5} component={Card}>
        <CardHeader title={left.title} />
        <ProInfiniteList
          ref={$left}
          loadMore={left.loadMore}
          render={(items) => renderList('left', items, left.render)}
        />
      </Grid>
      <Grid xs={2}>
        <TransferListActions
          selected={selected}
          onChange={onChange}
          onClean={onClean}
        />
      </Grid>
      <Grid xs={5} component={Card}>
        <CardHeader title={right.title} />
        <ProInfiniteList
          ref={$right}
          loadMore={right.loadMore}
          render={(items) => renderList('right', items, right.render)}
        />
      </Grid>
    </Grid>
  );
}
