import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProfileDto,
  UserLoginDto,
  UserRegistrationDto,
  UserResponseDto,
} from '@nx-tpdb/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { ProfileService } from '../profile/profile.service';
import { s } from 'vitest/dist/reporters-yx5ZTtEV';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private profileService: ProfileService
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
    return await this.userRepository.find({relations: ['profile']});
  }

  async findOneById(id: string) {
    return this.userRepository.findOne({ where: { id }, relations: ['profile'] });
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  update(id: string, updateUserDto: UserRegistrationDto) {
    const user = this.userRepository.findOne({ where: { id } });
    //TODO: Check if this works
    const updatedUser = {
      ...user,
      ...updateUserDto,
    };
    return this.userRepository.save(updatedUser);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id)
  }

  async login(dto: UserLoginDto): Promise<UserResponseDto> {
    const { username, password } = dto;
    const user = await this.findOneByUsername(username);
    if (user && (await this.validateUser(user, password))) {
      return new UserResponseDto(user.username, user.role);
    } else return null;
  }

  async addProfileToUser(
    userId: string,
    profileData: CreateProfileDto
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.profile = await this.profileService.create(profileData);
    return this.userRepository.save(user);
  }

  async validateUser(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  async _hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
