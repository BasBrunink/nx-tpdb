import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import {Role} from '@nx-tpdb/shared'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  username: string;

  @Column()
  password?: string;


  /**
   * TODO: We need to add this to the migration when we are finished with the auth BE task
   * CREATE TYPE "UserRole" AS ENUM ('admin', 'user', 'guest');
   * ALTER TABLE "user" ADD COLUMN "role" "UserRole" DEFAULT 'user';
   */
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User
  })
  role: Role;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile?: Profile;
}

