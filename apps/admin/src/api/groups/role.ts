import resourceGenerator from '../resource';
import {
  ParamsWithPagination,
  Permission,
  PlainObject,
  Role,
} from '../../typings';
import $http from '../request';

export const role = resourceGenerator<Role>('api/roles');

export function getRolePermissions(
  roleId: string,
  params: ParamsWithPagination<PlainObject>,
) {
  return $http<{ list: Permission[]; total: number }>({
    method: 'get',
    url: `api/roles/${roleId}/permissions`,
    params,
  }).then((res) => res.data);
}

export function addRolePermissions(roleId: string, permissions: Permission[]) {
  return $http({
    method: 'put',
    url: `api/roles/${roleId}/permissions`,
    data: { permissions },
  });
}

export function removeRolePermissions(
  roleId: string,
  permissions: Permission[],
) {
  return $http({
    method: 'delete',
    url: `api/roles/${roleId}/permissions`,
    data: { permissions },
  });
}
