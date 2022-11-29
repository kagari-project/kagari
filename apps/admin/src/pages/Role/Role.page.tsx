import React from 'react';
import { ProRestful } from '@kagari/ui/components/ProRestful';
import { role } from '../../api';
import IconButton from '@mui/material/IconButton';
import { createColumnHelper } from '@kagari/ui/components/ProTable';
import { Role } from '../../typings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CreationForm } from './CreationForm';
import { FilterForm } from './FilterForm';
import { EditionForm } from './EditionForm';
import { RolePermissionTransferList } from './RolePermissionsTransferList';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { ProModal } from '@kagari/ui/components/ProModal';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const columnsHelper = createColumnHelper<Role>();

export default function PermissionPage() {
  const $restful = React.useRef<any>(null);
  const $permissionTransfer = React.useRef<any>(null);
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
      {
        accessorKey: 'actions',
        cell: (info) => (
          <>
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
      {...role}
    >
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
          <RolePermissionTransferList restful={$restful} />
        </Box>
      </ProModal>
    </ProRestful>
  );
}
