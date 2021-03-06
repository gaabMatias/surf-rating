import './utils/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';

import { ForecastController } from './controller/forecast';
import { Application } from 'express';
import * as database from '@src/database'
import { BeachesController } from './controller/beaches';

export class SetupServer extends Server {
  constructor(port = 3000) {
    super();
  }
  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    await this.setupDatabase()
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const forecastController = new ForecastController();
    const beachesController = new BeachesController();

    this.addControllers([
      forecastController,
      beachesController,
    ]);
  }

  private async setupDatabase(): Promise<void> {
    await database.connect()
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return this.app;
  }
}
