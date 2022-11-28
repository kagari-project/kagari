import React from 'react';
import {
  ProRestful,
  CreateForm,
  EditForm,
  SearchForm,
} from '@kagari/ui/components/ProRestful';
import { user } from '../api';
import { ProForm, FormItem } from '@kagari/ui/components/ProForm';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createColumnHelper } from '@kagari/ui/components/ProTable';
import { User } from '../typings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const FilterForm: SearchForm = function (props) {
  const onSubmit = (formData: any) => {
    props.handleList({ username: formData.search });
  };
  return (
    <ProForm inline onSubmit={onSubmit}>
      <FormItem
        prop={'search'}
        render={({ field, name }) => {
          return <Input {...field} placeholder={name} />;
        }}
      />
      <IconButton type="submit">
        <SearchIcon color="primary" />
      </IconButton>
    </ProForm>
  );
};

export const CreationForm: CreateForm = function (props) {
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

export const EditionForm: EditForm = function (props) {
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

const columnsHelper = createColumnHelper<User>();

export default function UserPage() {
  const ref = React.useRef<any>(null);
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
        cell: (info) => (
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
        ),
      },
    ],
    [],
  );

  return (
    <ProRestful
      ref={ref}
      columns={columns}
      searchForm={FilterForm}
      createForm={CreationForm}
      editForm={EditionForm}
      {...user}
    />
  );
}
