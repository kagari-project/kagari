### @kagari/database

typeorm wrapper for kagari framework

usage

```typescript
import { DatabaseModule, NestLogger } from '@kagari/database';

DatabaseModule.forRoot({
  type: 'postgres',
  // same with TypeOrmModuleOptions
  logger: new NestLogger({ context: 'database' })
})

// also available using forRootAsync
```

reexport

```typescript
import { getRepositoryToken } from '@kagari/database';
// same as
import { getRepositoryToken } from '@nestjs/typeorm';

import { Not } from '@kagari/database'
// same as
import { Not } from 'typeorm'
```