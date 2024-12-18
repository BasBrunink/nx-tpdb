import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()

export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id?: string
  @Column()
  firstname: string

  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  @Column()
  lastname: string;
  @Column()
  dateOfBirth: Date;
  @Column()
  email: string;
}
