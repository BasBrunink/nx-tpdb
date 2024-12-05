import { Injectable } from '@nestjs/common';
import { UserRegistrationDto } from '@nx-tpdb/shared';


@Injectable()
export class UserService {
  create(createUserDto: UserRegistrationDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UserRegistrationDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
