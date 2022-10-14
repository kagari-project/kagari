### @kagari/restful

provides a protocol for list query
> this package is in develop, may not support every query operator

```typescript
import { Controller, Get } from '@nestjs/common';
import { ParsedQueryString, QueryProtocol } from '@kagari/restful';

@Controller()
class SomeClass {
  @Get()
  findAll(@QueryProtocol(/* supprts give validate pipe in */) query: ParsedQueryString) {
    // apply the query
  }
}
```

### use in browser
import the entire package will import also `@nestjs/*` packages.
to avoid it, use like below

```typescript
import { deserialize } from '@kagari/restful/dist/deserialize';
import { getOperatedValue } from '@kagari/restful/dist/helpers';
import { Operations } from '@kagari/restful/dist/types';

const querystring = deserialize({
  $page: 1,
  $pageSize: 20,
  $withDeleted: true,
  createdAt: getOperatedValue(Operations.bw, ['2022-10-01', '2022-10-31'])
})
// $page=1&$pageSize=20&$withDeleted=true&created=$bw(2022-10-01,2022-10-31)
```