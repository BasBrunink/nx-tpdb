
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config} from 'dotenv';

config();
const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: 'admin',
  password: 'admin',
  database: 'nestjs',
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}'
  ],
  migrations: [
    './apps/tpdb-backend-mono/migrations/structure/*{.ts,js}',
    './apps/tpdb-backend-mono/migrations/dummy/*{.ts,js}',
    './apps/tpdb-backend-mono/migrations/seed/*{.ts,js}',
  ],

});
