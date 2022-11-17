import React from 'react';
import { ProRestful } from './ProRestful';
import { createColumnHelper } from '../ProTable/index';

export default {
  title: 'ProRestful',
  component: ProRestful,
};

type User = {
  id: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

const api = {
  list: () =>
    Promise.resolve({
      list: [{ username: 'foobar', password: 'foobar' }],
      total: 20,
    }),
  createOne: () => Promise.resolve(),
  updateOne: () => Promise.resolve(),
  deleteOne: () => Promise.resolve(),
  getOne: () => Promise.resolve(),
};

export function Default() {
  const columnsHelper = createColumnHelper<User>();
  const columns = React.useMemo(
    () => [
      columnsHelper.accessor('id', {
        size: 1,
        cell: (info) => info.getValue(),
      }),
      columnsHelper.accessor('username', {
        cell: (info) => info.getValue(),
      }),
      columnsHelper.accessor('password', {
        cell: (info) => info.getValue(),
      }),
      columnsHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
      }),
      columnsHelper.accessor('updatedAt', {
        cell: (info) => info.getValue(),
      }),
      columnsHelper.accessor('deletedAt', {
        cell: (info) => info.getValue(),
      }),
    ],
    [],
  );

  return <ProRestful columns={columns} {...api} />;
}
