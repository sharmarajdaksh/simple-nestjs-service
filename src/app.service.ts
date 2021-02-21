import { Injectable, Inject, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseClient, DatabaseConfig, getDatabaseClient } from './db';

@Injectable()
export class AppService {
  declare databaseClient: DatabaseClient;

  constructor(
    private configService: ConfigService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {
    this.databaseClient = getDatabaseClient(
      configService.get<DatabaseConfig>('databaseConfig'),
    );
  }

  pingDatabase = async () => {
    return await this.databaseClient.ping();
  };
}
