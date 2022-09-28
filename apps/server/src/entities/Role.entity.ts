import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from '@kagari/database';
import { UserEntity } from './User.entity';
import { PermissionEntity } from './Permission.entity';

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  token: string;

  // roles belongs to many users
  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];

  // roles have many permissions
  @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
  @JoinTable()
  permissions: PermissionEntity[];
}
