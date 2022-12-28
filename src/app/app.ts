import express from 'express';
import routes from './routes/index.js';
import { createServer } from 'http';

const expressApp = express();

routes(expressApp);

const app = createServer(expressApp);

export default app;