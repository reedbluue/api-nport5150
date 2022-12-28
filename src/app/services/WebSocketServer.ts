import { Server } from 'socket.io';
import app from '../app.js';

export const WebSocketServer = new Server(app, {cors: {origin: '*'}});

export const startWebSocketServer = () => {
  WebSocketServer.on("connection", socket => console.log(`Sessão ${socket.id} ativa!`));
}

