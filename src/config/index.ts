import { DatabaseConfig } from 'src/db';

export interface GlobalConfig {
  environment: string;
}

interface ServerConfig {
  serverPort: number;
  serverHost: string;
}

interface Config {
  globalConfig: GlobalConfig;
  serverConfig: ServerConfig;
  databaseConfig: DatabaseConfig;
}

export default (): Config => ({
  serverConfig: {
    serverPort: parseInt(process.env.PORT, 10) || 3000,
    serverHost: process.env.HOST || '127.0.0.1',
  },
  databaseConfig: {
    databaseType: 'postgres',
    databaseHost: process.env.DATABASE_HOST || '127.0.0.1',
    databaseName: process.env.DATABASE_NAME || 'database',
    databasePort: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    databaseUsername: process.env.DATABASE_USER || '',
    databasePassword: process.env.DATABASE_PASSWORD || '',
  },
  globalConfig: {
    environment: process.env.NODE_ENV,
  },
});
