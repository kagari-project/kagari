import { LocalAuthenticatedGuard } from './local-authenticated.guard';
import { JwtAuthenticatedGuard } from './jwt-authenticated.guard';

export function getAuthenticatedGuard(type: 'local' | 'jwt') {
  if (type === 'local') {
    return LocalAuthenticatedGuard;
  }
  if (type === 'jwt') {
    return JwtAuthenticatedGuard;
  }
}
