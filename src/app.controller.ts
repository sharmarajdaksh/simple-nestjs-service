import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Logger,
  LoggerService,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Get('/healthcheck')
  async healthcheck(@Res() res: Response) {
    try {
      await this.appService.pingDatabase();
    } catch (error) {
      this.logger.error(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Internal Server Error' });
    }
    res.status(HttpStatus.OK).send({ message: 'OK' });
  }
}
