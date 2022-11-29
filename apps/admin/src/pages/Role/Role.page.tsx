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

const columnsHelper = createColumnHelper<Role>();

export default function PermissionPage() {
  const ref = React.useRef<any>(null);
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
      {...role}
    />
  );
}
