import { DatabaseClient, DatabaseConfig } from '../index';
import { Client } from 'pg';

export class PostgresClient implements DatabaseClient {
  declare _databaseClient: Client;

  constructor(private readonly databaseConfig: DatabaseConfig) {
    this._databaseClient = this.getDatabaseClient(databaseConfig);
    this._databaseClient.connect();
  }

  getDatabaseClient = (databaseConfig: DatabaseConfig): Client => {
    const client = new Client({
      host: databaseConfig.databaseHost,
      port: databaseConfig.databasePort,
      database: databaseConfig.databaseName,
      user: databaseConfig.databaseUsername,
      password: databaseConfig.databasePassword,
    });
    return client;
  };

  ping = async () => {
    return await this._databaseClient.query(`SELECT NOW();`);
  };

  disconnect = async () => {
    await this._databaseClient.end();
  };
}
