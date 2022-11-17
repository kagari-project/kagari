import React from 'react';
import {
  ProRestful,
  CreateForm,
  EditForm,
  SearchForm,
} from '@kagari/ui/components/ProRestful';
import { permission } from '../api';
import { ProForm, FormItem } from '@kagari/ui/components/ProForm';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { createColumnHelper } from '@kagari/ui/components/ProTable';
import { Permission } from '../typings';

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
        prop="name"
        render={({ name, field }) => (
          <>
            <InputLabel>{name}</InputLabel>
            <Input {...field} />
          </>
        )}
      />

      <FormItem
        prop="token"
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
        prop="name"
        render={({ name, field }) => (
          <>
            <InputLabel>{name}</InputLabel>
            <Input {...field} />
          </>
        )}
      />

      <FormItem
        prop="token"
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

const columnsHelper = createColumnHelper<Permission>();

export default function PermissionPage() {
  const columns = React.useMemo(
    () => [
      columnsHelper.accessor('id', {
        size: 1,
        cell: (info) => info.getValue(),
      }),
      columnsHelper.accessor('name', {
        cell: (info) => info.getValue(),
      }),
      columnsHelper.accessor('token', {
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

  return (
    <ProRestful
      columns={columns}
      searchForm={FilterForm}
      createForm={CreationForm}
      editForm={EditionForm}
      {...permission}
    />
  );
}