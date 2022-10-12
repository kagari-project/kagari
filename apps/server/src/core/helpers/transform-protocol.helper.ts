import { ParsedQueryString } from '@kagari/restful';
import { extractOperators } from '@kagari/restful/dist/extract-operators';
import { FindManyOptions } from '@kagari/database';

export function transformProtocolHelper(
  data: ParsedQueryString,
): FindManyOptions {
  const { $page, $pageSize, $select, $where, $sort, $withDeleted } = data;
  return {
    select: $select as string[],
    where: extractOperators($where),
    order: $sort,
    take: $pageSize,
    skip: $page * $pageSize - $pageSize,
    withDeleted: $withDeleted,
  };
}
