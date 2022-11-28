import React, { useCallback, useEffect } from 'react';
import {
  ProRestful,
  CreateForm,
  EditForm,
  SearchForm,
} from '@kagari/ui/components/ProRestful';
import {
  addUserRoles,
  getUserRoles,
  removeUserRoles,
  role,
  user,
} from '../api';
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
import MediationIcon from '@mui/icons-material/Mediation';
import { ProModal } from '@kagari/ui/components/ProModal';
import {
  ProTransferList,
  PanelConfig,
  OnChangeParams,
} from '@kagari/ui/components/ProTransferList';
import Paper from '@mui/material/Paper';

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

export const UserRoleTransferList = function (props: any) {
  const loadRoles: PanelConfig['loadMore'] = async function (page, pageSize) {
    return role.list({ $page: page, $pageSize: pageSize });
  };

  const loadCurrentRoles: PanelConfig['loadMore'] = useCallback(
    async function (page, pageSize) {
      return getUserRoles(props.restful.current.focusedRow.id, {
        $page: page,
        $pageSize: pageSize,
      });
    },
    [props.restful],
  );

  const render: PanelConfig['render'] = (item) => {
    return `${item.name}:${item.token}`;
  };

  const onChange = async (params: OnChangeParams) => {
    console.log(params);
    if (params.from === 'left') {
      // add relation
      await addUserRoles(
        props.restful.current.focusedRow.id,
        params.selected.left,
      );
    } else {
      // remove relation
      await removeUserRoles(
        props.restful.current.focusedRow.id,
        params.selected.right,
      );
    }
  };

  return (
    <Box>
      <ProTransferList
        onChange={onChange}
        left={{ loadMore: loadRoles, render }}
        right={{ loadMore: loadCurrentRoles, render }}
      />
    </Box>
  );
};

const columnsHelper = createColumnHelper<User>();

export default function UserPage() {
  const $restful = React.useRef<any>(null);
  const $transfer = React.useRef<any>(null);
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
                $restful.current.setFocusedRow(info.row.original);
                requestAnimationFrame(() => {
                  $transfer.current.handleOpen();
                });
              }}
            >
              <MediationIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                $restful.current.setFocusedRow(info.row.original);
                $restful.current.setIsDrawerOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                $restful.current.handleDelete(info.row.original);
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
      ref={$restful}
      columns={columns}
      searchForm={FilterForm}
      createForm={CreationForm}
      editForm={EditionForm}
      {...user}
    >
      <ProModal
        ref={$transfer}
        onClose={() => {
          $restful.current.setFocusedRow(null);
          $transfer.current.handleClose();
        }}
      >
        <Box
          component={Paper}
          sx={{
            width: '800px',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <UserRoleTransferList restful={$restful} />
        </Box>
      </ProModal>
    </ProRestful>
  );
}
