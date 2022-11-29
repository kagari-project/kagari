import resourceGenerator from '../resource';
import { Permission } from '../../typings';

export const permission = resourceGenerator<Permission>('api/permissions');
