type WithTimestampFields<T> = {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
} & T;

export type UserModel = WithTimestampFields<{
  id: string;
  username: string;
  password: string;
}>;

export type RoleModel = WithTimestampFields<{
  id: string;
  name: string;
  token: string;
}>;

export type PermissionModel = WithTimestampFields<{
  id: string;
  name: string;
  token: string;
}>;
