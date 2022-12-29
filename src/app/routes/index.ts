import { RequestError } from '../errors/requestErrors.js';
import express from 'express';
import type { Express, ErrorRequestHandler } from 'express';
import cors from 'cors';
import { serialDeviceRoutes } from './serialDeviceRoutes.js';
import { nPortDeviceRoutes } from './nPortDeviceRoutes.js';
import { deviceAssociationRoutes } from './deviceAssiciationRoutes.js';

const routes = (app: Express) => {
  app.all('/', (_, res) => {
    return res.json('@API-Nport');
  });

  app.use(express.json());
  app.use(cors());
  app.use(
    serialDeviceRoutes,
    nPortDeviceRoutes,
    deviceAssociationRoutes
  );

  app.use(( _, __, next) => {
    next(new RequestError());
  });

  app.use(((err, _, res, next) => {
    if (err) {
      res
        .status(err.status || 404)
        .json({ error: err.name, message: err.message });
    } else {
      next();
    }
  }) as ErrorRequestHandler);
};

export default routes;
