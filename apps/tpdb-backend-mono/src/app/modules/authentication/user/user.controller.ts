import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateProfileDto, UserRegistrationDto } from '@nx-tpdb/shared';
import { ApiBody } from '@nestjs/swagger';
import { User } from './entities/user.entity';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserRegistrationDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserRegistrationDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Post(':userId/profile')
  async addProfile(@Param('userId') userId: string, @Body() dto: CreateProfileDto) {
    return this.userService.addProfileToUser(userId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
