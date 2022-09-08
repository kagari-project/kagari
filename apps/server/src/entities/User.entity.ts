import { Entity, PrimaryGeneratedColumn, Column } from '@kagari/database';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
