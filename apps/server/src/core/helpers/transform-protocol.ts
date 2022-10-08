import { ParsedQueryString } from '@kagari/restful';
import { extractOperators } from '@kagari/restful/dist/extract-operators';
import { FindManyOptions, IsNull } from '@kagari/database';

export function transformProtocol(data: ParsedQueryString): FindManyOptions {
  const { $page, $pageSize, $select, $where } = data;
  return {
    select: $select as string[],
    where: extractOperators($where),
    take: $pageSize,
    skip: $page * $pageSize - $pageSize,
  };
}
