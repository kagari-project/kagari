import resourceGenerator from '../resource';
import { User } from '../../typings';

export const user = resourceGenerator<User>('api/users');
