import dotenv from 'dotenv';
import app from './app/app.js';
import chalk from 'chalk';
import { startDbConnection } from './app/configs/dbConfig.js';
import { startWebSocketServer } from './app/services/WebSocketServer.js';

dotenv.config();

const { PORT } = process.env;

await startDbConnection();

startWebSocketServer();

app.listen(PORT || 3000, () => {
  console.log(chalk.green(`API iniciada em: http://localhost:${PORT}`));
});