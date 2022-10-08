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

export type ParsedQueryString = {
  $page?: number;
  $pageSize?: number;
  $withDeleted?: boolean;
  $filters?: unknown[];
  $where?: unknown[];
  $sort?: unknown[];
  $select?: unknown[];
};

export type Serialized = {
  [key in keyof ParsedQueryString]: unknown;
};
