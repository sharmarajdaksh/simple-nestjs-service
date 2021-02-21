import { PostgresClient } from './postgres';

export abstract class DatabaseClient {
  abstract ping();
  abstract disconnect();
}

export interface DatabaseConfig {
  databaseHost: string;
  databasePort: number;
  databaseName: string;
  databaseUsername: string;
  databasePassword: string;
  databaseType: 'postgres';
}

export const getDatabaseClient = (
  databaseConfig: DatabaseConfig,
): DatabaseClient => {
  switch (databaseConfig.databaseType) {
    case 'postgres':
      return new PostgresClient(databaseConfig);
    default:
      return new PostgresClient(databaseConfig);
  }
};
