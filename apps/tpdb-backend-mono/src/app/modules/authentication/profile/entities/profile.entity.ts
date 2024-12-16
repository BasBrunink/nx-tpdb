import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id?: string
  firstname: string
  lastname: string;
  dateofBirth: Date;
  email: string;
}
