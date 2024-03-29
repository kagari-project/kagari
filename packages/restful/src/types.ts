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
  $relations: '$relations',
};

export type ParsedQueryString = {
  $page?: number;
  $pageSize?: number;
  $withDeleted?: boolean;
  $where?: Array<{ [key: string]: string }>;
  $sort?: Record<string, 'DESC' | 'ASC'>;
  $select?: unknown[];
  $relations?: string[];
};

export type Serialized = {
  [key in keyof ParsedQueryString]: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & { [key: string]: any };
