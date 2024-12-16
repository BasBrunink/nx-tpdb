import { UserResponseDto } from '../user';

export interface UserJwtResponse {
  user: UserResponseDto;
  accessToken: string;
}
