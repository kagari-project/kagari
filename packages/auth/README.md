@kagari/auth
=====
A facility for authentication based on passport & typeorm, supports session and jwt

### Usage
prepare business logic
```typescript
// validation function
import { ComposeAccessTokenPayload, ComposeRefreshTokenPayload, ValidateFunction } from '@kagari/auth';
import { UserEntity } from './User.entity';

// validate credential
export const validate: ValidateFunction = (credential) => {
  // any logic validate if input is valid
  return credential // return validated values
}

// verify crendetial
export const verify: ValidateFunction = async (repo, credential) => {
  // your logic verify the user(if password matches)
  return { id: 1, username: 'foobar' }
}

// token genderators
export const getAccessTokenPayload: ComposeAccessTokenPayload = (userInfo) => (userInfo)
export const getRefreshTokenPayload: ComposeRefreshTokenPayload = (userInfo) => (userInfo)
```

register modules
```typescript
// local session
import { JwtAuthModule, LocalAuthModule } from '@kagari/auth';
import { UserEntity } from './User.entity';
import { composeAccessTokenPayload, composeRefreshTokenPayload } from './helpers';


// or use forRoot directly
LocalAuthModule.forRootAsync({
  useFactory: () => ({
    entity: UserEntity,
    validate: validate,
    verfiy: verify,
    session: {
      // options for express-session
    },
    include: [
      // options for MiddlewareConsumer.forRoutes()
      // for all by default
    ],
    exclude: [
      // options for MiddlewareConsumer.forRoutes().exclude()
      // exclude `/api/**` by default
    ],
  })
})

// or use forRoot directly
JwtAuthModule.forRootAsync({
  useFactory: () => ({
    entity: UserEntity,
    validate: validate,
    verify: verify,
    jwt: {
      // options for @nestjs/jwt module
    },
    payload: {
      access: composeAccessTokenPayload,
      refresh: composeRefreshTokenPayload,
    }
  })
})
```