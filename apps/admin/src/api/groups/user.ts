import resourceGenerator from '../resource';
import {
  ParamsWithPagination,
  Permission,
  PlainObject,
  Role,
  User,
} from '../../typings';
import $http from '../request';

export const user = resourceGenerator<User>('api/users');

export function getUserRoles(
  userId: string,
  params: ParamsWithPagination<PlainObject>,
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

export function getUserPermissions(
  userId: string,
  params: ParamsWithPagination<PlainObject>,
) {
  return $http<{ list: Permission[]; total: number }>({
    method: 'get',
    url: `api/users/${userId}/permissions`,
    params,
  }).then((res) => res.data);
}

export function addUserPermissions(userId: string, permissions: Permission[]) {
  return $http({
    method: 'put',
    url: `api/users/${userId}/permissions`,
    data: { permissions },
  });
}

export function removeUserPermissions(
  userId: string,
  permissions: Permission[],
) {
  return $http({
    method: 'delete',
    url: `api/users/${userId}/permissions`,
    data: { permissions },
  });
}
