import { Role } from './role.enum';

export class UserRegistrationDto {
  username: string;
  password?: string;
  role: Role;

  constructor(username: string, password: string, role: Role = Role.User) {
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
