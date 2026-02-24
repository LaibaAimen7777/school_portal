import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME, // your DB username
  password: process.env.DB_PASSWORD, // your DB password
  database: process.env.DB_NAME, // your DB name
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // MUST be false when using migrations
});
