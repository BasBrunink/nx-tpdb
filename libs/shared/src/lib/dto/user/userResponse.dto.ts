import { Role } from './role.enum';

export class UserResponseDto {
  id: string;
  username: string;
  role: Role

  constructor(id: string, username: string, role: Role) {
    this.id = id;
    this.username = username;
    this.role = role;
  }
}
