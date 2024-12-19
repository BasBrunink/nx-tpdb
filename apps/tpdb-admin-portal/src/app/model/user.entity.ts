import { Role } from '@nx-tpdb/shared';

export class User {
  id: string | undefined;
  username: string | undefined;
  password: string | undefined;
  role: Role | undefined;
}
