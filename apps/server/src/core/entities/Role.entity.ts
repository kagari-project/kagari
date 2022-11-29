import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from '@kagari/database';
import { UserEntity } from './User.entity';
import { PermissionEntity } from './Permission.entity';
import { M2M_ROLES__PERMISSIONS } from './junctions';

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  token: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;

  // roles belongs to many users
  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];

  // roles have many permissions
  @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
  @JoinTable(M2M_ROLES__PERMISSIONS)
  permissions: PermissionEntity[];
}
