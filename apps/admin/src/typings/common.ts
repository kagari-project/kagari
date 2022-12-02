export type Pagination = {
  $page?: number;
  $pageSize?: number;
};

export type PlainObject = Record<string, any>;

export type ParamsWithPagination<T = unknown> = T & Partial<Pagination>;

export type BaseDTO = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type DTO<T> = BaseDTO & T;

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

export type Media = DTO<{
  key: string;
  storage: string;
  mime: string;
}>;
