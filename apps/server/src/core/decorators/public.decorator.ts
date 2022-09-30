import { IS_PUBLIC } from '../token';
import { SetMetadata } from '@nestjs/common';

export const IsPublic = () => SetMetadata(IS_PUBLIC, true);
