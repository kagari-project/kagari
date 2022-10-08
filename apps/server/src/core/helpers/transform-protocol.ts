import { ParsedQueryString } from '@kagari/restful';
import { FindManyOptions, IsNull } from '@kagari/database';

export function transformProtocol(data: ParsedQueryString): FindManyOptions {
  const { $page, $pageSize, $select, $where } = data;
  console.log(data);
  return {
    select: $select as string[],
    take: $pageSize,
    skip: $page * $pageSize - $pageSize,
  };
}
