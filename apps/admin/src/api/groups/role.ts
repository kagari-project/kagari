import resourceGenerator from '../resource';
import { Role } from '../../typings';

export const role = resourceGenerator<Role>('api/roles');
