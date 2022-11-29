import React from 'react';
import { ProRestful } from '@kagari/ui/components/ProRestful';
import { user } from '../../api';

import IconButton from '@mui/material/IconButton';

import Box from '@mui/material/Box';
import { createColumnHelper } from '@kagari/ui/components/ProTable';
import { User } from '../../typings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import { ProModal } from '@kagari/ui/components/ProModal';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import Paper from '@mui/material/Paper';
import { FilterForm } from './FilterForm';
import { CreationForm } from './CreationForm';
import { EditionForm } from './EditionForm';
import { UserRoleTransferList } from './UserRolesTransferList';
import { UserPermissionTransferList } from './UserPermissionsTransferList';

const columnsHelper = createColumnHelper<User>();

export default function UserPage() {
  const $restful = React.useRef<any>(null);
  const $roleTransfer = React.useRef<any>(null);
  const $permissionTransfer = React.useRef<any>(null);
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
                  $roleTransfer.current.handleOpen();
                });
              }}
            >
              <GroupsIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                $restful.current.setFocusedRow(info.row.original);
                requestAnimationFrame(() => {
                  $permissionTransfer.current.handleOpen();
                });
              }}
            >
              <VpnKeyIcon />
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
        ref={$roleTransfer}
        onClose={() => {
          $restful.current.setFocusedRow(null);
          $roleTransfer.current.handleClose();
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

      <ProModal
        ref={$permissionTransfer}
        onClose={() => {
          $restful.current.setFocusedRow(null);
          $permissionTransfer.current.handleClose();
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
          <UserPermissionTransferList restful={$restful} />
        </Box>
      </ProModal>
    </ProRestful>
  );
}
