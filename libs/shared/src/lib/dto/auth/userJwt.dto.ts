import { Role } from '../user';

export interface UserJWTResponseDTO {
  username?: string;
  userId?: string;
  role?: Role

}
