import resourceGenerator from '../resource';
import { Permission, Role } from '../../typings';
import $http from '../request';

export const role = resourceGenerator<Role>('api/roles');

export function getRolePermissions(roleId: string) {
  return $http({
    method: 'get',
    url: `api/roles/${roleId}/permissions`,
  });
}

export function updateRolePermissions(
  roleId: string,
  permissions: Permission[],
) {
  return $http({
    method: 'patch',
    url: `api/roles/${roleId}/permissions`,
    data: permissions,
  });
}
