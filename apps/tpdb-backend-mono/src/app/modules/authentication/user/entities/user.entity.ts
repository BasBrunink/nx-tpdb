import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';

@Entity({name:'users'})

export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  username: string
  password: string
  @OneToOne(() => Profile)
  @JoinColumn()
  profile?: Profile
}

