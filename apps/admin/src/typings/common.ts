export type Pagination = {
  $page?: number;
  $pageSize?: number;
};

export type PlainObject = Record<string, any>;

export type ParamsWithPagination<T = unknown> = T & Partial<Pagination>;

export type DTO<T> = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
} & T;

export type User = DTO<{
  username: string;
  password: string;
}>;

export type Role = DTO<{
  name: string;
  token: string;
}>;

export type Permission = DTO<{
  name: string;
  token: string;
}>;
