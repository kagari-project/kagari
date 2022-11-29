import React, { useCallback } from 'react';
import {
  OnChangeParams,
  PanelConfig,
  ProTransferList,
} from '@kagari/ui/components/ProTransferList';
import {
  addRolePermissions,
  addUserPermissions,
  getRolePermissions,
  getUserPermissions,
  permission,
  removeRolePermissions,
  removeUserPermissions,
} from '../../api';
import Box from '@mui/material/Box';

export const RolePermissionTransferList = function (props: {
  restful: React.MutableRefObject<any>;
}) {
  const loadPermissions: PanelConfig['loadMore'] = async function (
    page,
    pageSize,
  ) {
    return permission.list({ $page: page, $pageSize: pageSize });
  };

  const loadCurrentPermissions: PanelConfig['loadMore'] = useCallback(
    async (page, pageSize) => {
      return getRolePermissions(props.restful.current.focusedRow.id, {
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
    if (params.from === 'left') {
      // add relation
      await addRolePermissions(
        props.restful.current.focusedRow.id,
        params.selected.left,
      );
    } else {
      // remove relation
      await removeRolePermissions(
        props.restful.current.focusedRow.id,
        params.selected.right,
      );
    }
  };

  return (
    <Box>
      <ProTransferList
        onChange={onChange}
        left={{
          loadMore: loadPermissions,
          render,
          title: 'Available Permissions',
        }}
        right={{
          loadMore: loadCurrentPermissions,
          render,
          title: 'Owned Permissions',
        }}
      />
    </Box>
  );
};
