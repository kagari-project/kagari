import resourceGenerator from '../resource';
import { ParamsWithPagination, Permission, Role, User } from '../../typings';
import $http from '../request';

export const user = resourceGenerator<User>('api/users');

export function getUserRoles(
  userId: string,
  params: ParamsWithPagination<Record<string, any>>,
) {
  return $http<{ list: Role[]; total: number }>({
    method: 'get',
    url: `api/users/${userId}/roles`,
    params,
  }).then((res) => res.data);
}

export function addUserRoles(userId: string, roles: Role[]) {
  return $http({
    method: 'put',
    url: `api/users/${userId}/roles`,
    data: { roles },
  });
}

export function removeUserRoles(userId: string, roles: Role[]) {
  return $http({
    method: 'delete',
    url: `api/users/${userId}/roles`,
    data: { roles },
  });
}
