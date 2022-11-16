import React from 'react';
import ProTable from './ProTable';
import Button from '@mui/material/Button';

export default {
  title: 'ProTable',
  component: ProTable,
};

export function Default() {
  const columns = [
    { prop: 'username' },
    { prop: 'password', format: () => '******' },
    {
      prop: 'actions',
      buttons: (
        <>
          <Button>aaa</Button>
          <Button>bbb</Button>
        </>
      ),
    },
  ];
  const rows = [
    { username: 'Kagari', password: 'Reiyi' },
    { username: 'Kagari', password: 'Reiyi' },
  ];

  return <ProTable columns={columns} rows={rows}></ProTable>;
}
