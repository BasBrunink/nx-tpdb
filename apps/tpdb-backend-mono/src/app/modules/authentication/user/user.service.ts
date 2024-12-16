import { Injectable } from '@nestjs/common';
import { UserRegistrationDto } from '@nx-tpdb/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
  }

  async create(createUserDto: UserRegistrationDto): Promise<User> {
    const user: User = {
      ...createUserDto
    }
    const createdUser = this.userRepository.create(user);
    return await this.userRepository.save(createdUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: string) {
    return this.userRepository.findOne({where:{id}})
  }

  update(id: string, updateUserDto: UserRegistrationDto) {

  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
