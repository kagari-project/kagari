import React, { useCallback } from 'react';
import {
  OnChangeParams,
  PanelConfig,
  ProTransferList,
} from '@kagari/ui/components/ProTransferList';
import { addUserRoles, getUserRoles, removeUserRoles, role } from '../../api';
import Box from '@mui/material/Box';

export const UserRoleTransferList = function (props: {
  restful: React.MutableRefObject<any>;
}) {
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
        left={{ loadMore: loadRoles, render, title: 'Available Roles' }}
        right={{ loadMore: loadCurrentRoles, render, title: 'Owned Roles' }}
      />
    </Box>
  );
};
