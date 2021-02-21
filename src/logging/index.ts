import { LoggerService } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

export const getLogLevelForEnvironment = (environment: string): string => {
  switch (environment) {
    case 'dev':
      return 'debug';
    case 'test':
      return 'info';
    case 'stage':
      return 'warn';
    case 'prod':
      return 'warn';
    default:
      return 'info';
  }
};

export const createWinstonLogger = (): LoggerService => {
  return WinstonModule.createLogger({
    defaultMeta: { service: 'authentication-service' },
    format: format.combine(format.timestamp(), format.json()),
    level: getLogLevelForEnvironment(process.env.NODE_ENV),
    transports: [new transports.Console()],
  });
};
