import request, { $request } from '../request';
import { User } from '../../typings';

export function getProfile() {
  return request<User>({
    url: '/auth/profile',
    method: 'get',
  });
}

export function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  return $request<{ data: User; accessToken: string; refreshToken: string }>({
    url: '/auth/login',
    method: 'post',
    data: { username, password },
  });
}
