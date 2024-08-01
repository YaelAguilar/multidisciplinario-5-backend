import { DataSource, DataSourceOptions } from 'typeorm';
import { createPool, Pool } from 'mysql2/promise';
import { User } from '../auth/infrastructure/entities/UserEntity';
import { Kit } from '../kitManagement/infrastructure/entities/KitEntity';
import dotenv from 'dotenv';
import { SensorEntity } from '../sensorManagement/infrastructure/entities/SensorEntity';

dotenv.config();

const typeORMConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Kit, SensorEntity],
  synchronize: true,
};

export const AppDataSource = new DataSource(typeORMConfig);

const pool: Pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || 'hexagonal',
});

export default pool;
