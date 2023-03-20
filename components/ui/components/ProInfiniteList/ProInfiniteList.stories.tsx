import React from 'react';
import { ProInfiniteList } from './ProInfiniteList';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

export default {
  title: 'ProInfiniteList',
  component: ProInfiniteList,
};

async function loadMore(page = 1, pageSize = 10) {
  const response = await fetch(
    `https://api.github.com/repos/facebook/react/issues?page=${page}&pageSize=${pageSize}`,
    {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/vnd.github.v3+json',
      }),
    },
  );
  const list = await response.json();

  return {
    list,
    total: 120,
  };
}

export function Default() {
  return (
    <ProInfiniteList
      loadMore={loadMore}
      render={(items) =>
        items.map((item, i) => (
          <ListItemButton key={`#${i}-${item.id}`}>
            <ListItemIcon>
              <Checkbox />
            </ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </ListItemButton>
        ))
      }
    />
  );
}
