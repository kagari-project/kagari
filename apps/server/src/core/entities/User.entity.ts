import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from '@kagari/database';
import { RoleEntity } from './Role.entity';
import { PermissionEntity } from './Permission.entity';
import { M2M_USERS__PERMISSIONS, M2M_USERS__ROLES } from './junctions';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;

  // users have many roles
  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable(M2M_USERS__ROLES)
  roles: RoleEntity[];

  // users have many permissions
  @ManyToMany(() => PermissionEntity, (permission) => permission.id)
  @JoinTable(M2M_USERS__PERMISSIONS)
  permissions: PermissionEntity[];
}
