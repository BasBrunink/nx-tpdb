import { Role } from './role.enum';

export class UserResponseDto {
  username: string;
  role: Role

  constructor(username: string, role: Role) {
    this.username = username;
    this.role = role;
  }
}
