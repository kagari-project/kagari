export const Operations = {
  bw: '$bw',
  eq: '$eq',
  ilike: '$ilike',
  like: '$like',
  in: '$in',
  isnull: '$isnull',
  lt: '$lt',
  lte: '$lte',
  gt: '$gt',
  gte: '$gte',
  not: '$not',
};

export const QueryCommand = {
  $select: '$select',
  $withDeleted: '$withDeleted',
  $page: '$page',
  $pageSize: '$pageSize',
  $sort: '$sort',
  $orWhere: '$orWhere',
};

export type ParsedQueryString = {
  $page?: number;
  $pageSize?: number;
  $withDeleted?: boolean;
  $where?: Array<{ [key: string]: string }>;
  $sort?: unknown[];
  $select?: unknown[];
};

export type Serialized = {
  [key in keyof ParsedQueryString]: unknown;
};
