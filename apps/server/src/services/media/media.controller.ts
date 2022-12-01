import { CreateBaseControllerHelper } from '../../core/helpers/create-base-controller.helper';
import { MediaEntity } from './media.entity';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { getAuthenticatedGuard } from '../../core/guards/authenticated.guard';
import { RoleBasedAccessControlGuard } from '@kagari/rbac';

@UseGuards(getAuthenticatedGuard('jwt'), RoleBasedAccessControlGuard)
export class MediaController extends CreateBaseControllerHelper<MediaEntity>(
  MediaEntity,
  { controllerOptions: { path: 'media' } },
) {
  async createOne(): Promise<any> {
    throw new NotFoundException();
  }
}
