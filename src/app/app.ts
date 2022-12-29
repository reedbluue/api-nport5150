import express from 'express';
import routes from './routes/index.js';
import { Server } from 'socket.io';
import { createServer } from 'http';

const expressApp = express();

export const app = createServer(expressApp);

export const WebSocketServer = new Server(app, {cors: {origin: '*'}});

WebSocketServer.on("connection", socket => console.log(`Sessão ${socket.id} ativa!`));

routes(expressApp);