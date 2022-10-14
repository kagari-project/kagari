### @kagari/rbac

rbac implement for kagari framework, needs work with `@kagari/auth` together.

usage

```typescript
// prepare business logic
import { CanActivateFunction, RoleBasedAccessControlModule } from '@kagari/rbac';
import { ExecutionContext, UseGuards } from '@nestjs/common';
import { UserEntity } from './User.entity';
import { RoleEntity } from './Role.entity';
import { PermissionEntity } from './Permission.entity';
import { LocalAuthenticatedGuard } from './local-authenticated.guard';

const canActivate: CanActivateFunction = function(context: ExecutionContext) {
  // your logic check if this user can pass
  
  // this referes to RoleBasedAccessControlModule
  // which injects Reflector, you can get any injectable by it
}

RoleBasedAccessControlModule.forRoot({
  entities: {
    user: UserEntity,
    role: RoleEntity,
    permission: PermissionEntity
  },
  canActivate: canActivate
})

@UseGuards(LocalAuthenticatedGuard, RoleBasedAccessControlModule)
class SomeController {
  // all handlers under this controller will be protected by rbac strategy
}
```