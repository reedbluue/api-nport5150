import { RequestError } from '../errors/requestErrors.js';
import express from 'express';
import type { Express, ErrorRequestHandler } from 'express';
import nPortRoutes from './nPortRoutes.js';
import cors from 'cors';

const routes = (app: Express) => {

  app.all('/', (_, res) => {
    return res.json('@API-Nport5150');
  });

  app.use(express.json());
  app.use(cors());
  app.use(nPortRoutes);

  app.use(((err, _, __, next) => {
    if(!err) {
      next(new RequestError());
    } else {
      next(err);
    }
  }) as ErrorRequestHandler);

  app.use(((err, _, res, next) => {
    if(err) {
      res.status(err.status || 404).json({error: err.name, message: err.message});
    } else {
      next();
    }
  }) as ErrorRequestHandler);
  
}

export default routes;