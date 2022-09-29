import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from '@kagari/database';
import { RoleEntity } from './Role.entity';
import { PermissionEntity } from './Permission.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  // users have many roles
  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[];

  // users have many permissions
  @ManyToMany(() => PermissionEntity, (permission) => permission.id)
  @JoinTable()
  permissions: PermissionEntity[];
}
