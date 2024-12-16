import { Injectable } from '@nestjs/common';
import { UserLoginDto, UserRegistrationDto, UserResponseDto } from '@nx-tpdb/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: UserRegistrationDto): Promise<User> {
    const user: User = {
      password: await this._hashPassword(createUserDto.password),
      username: createUserDto.username,
      role: createUserDto.role,
    };
    const createdUser = this.userRepository.create(user);
    return await this.userRepository.save(createdUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  update(id: string, updateUserDto: UserRegistrationDto) {
    const user = this.userRepository.findOne({where:{id}})
    //TODO: Check if this works
    const updatedUser = {
      ...user,
      ...updateUserDto,
    }
    return this.userRepository.save(updatedUser)
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(dto: UserLoginDto): Promise<UserResponseDto> {
    const {username, password} = dto;
    const user = await this.findOneByUsername(username);
    if(user && (await this._validateUser(user, password))) {
      return  new UserResponseDto(user.username, user.role)
    } else return null;
  }


  private async _validateUser(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password)
  }

  private async _hashPassword(password: string): Promise<string>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt );
  }
}
