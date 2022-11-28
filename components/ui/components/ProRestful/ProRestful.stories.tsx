import React from 'react';
import { CreateForm, EditForm, ProRestful } from './ProRestful';
import { createColumnHelper } from '../ProTable/index';
import { FormItem, ProForm } from '../ProForm';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
  list: () => {
    console.log('handle list');
    return Promise.resolve({
      list: [{ username: 'foobar', password: 'foobar' }],
      total: 20,
    });
  },
  createOne: () => Promise.resolve(),
  updateOne: () => Promise.resolve(),
  deleteOne: (row) => {
    console.log('handle delete', row);
    return Promise.resolve();
  },
  getOne: () => Promise.resolve(),
};

const CreationForm: CreateForm = function (props) {
  return (
    <ProForm onSubmit={props.handleCreate} sx={{ padding: 1 }}>
      <FormItem
        prop="username"
        render={({ name, field }) => (
          <>
            <InputLabel>{name}</InputLabel>
            <Input {...field} />
          </>
        )}
      />

      <FormItem
        prop="password"
        render={({ name, field }) => (
          <>
            <InputLabel>{name}</InputLabel>
            <Input {...field} />
          </>
        )}
      />

      <Box>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </ProForm>
  );
};

const EditionForm: EditForm = function (props) {
  const onSubmit = (formData: any) => props.handleEdit(formData.id, formData);
  return (
    <ProForm
      onSubmit={onSubmit}
      sx={{ padding: 1 }}
      defaultValues={props.data as any}
    >
      <FormItem
        prop="username"
        render={({ name, field }) => (
          <>
            <InputLabel>{name}</InputLabel>
            <Input {...field} />
          </>
        )}
      />

      <FormItem
        prop="password"
        render={({ name, field }) => (
          <>
            <InputLabel>{name}</InputLabel>
            <Input {...field} />
          </>
        )}
      />

      <Box>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </ProForm>
  );
};

export function Default() {
  const ref = React.useRef(null);
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
      {
        accessorKey: 'actions',
        cell: (info) => {
          return (
            <>
              <IconButton
                onClick={() => {
                  ref.current.setFocusedRow(info.row.original);
                  ref.current.setIsDrawerOpen(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  ref.current.handleDelete(info.row.original);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </>
          );
        },
      },
    ],
    [],
  );

  return (
    <ProRestful
      ref={ref}
      columns={columns}
      createForm={CreationForm}
      editForm={EditionForm}
      {...api}
    />
  );
}
