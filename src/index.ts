import dotenv from 'dotenv';
import app from './app/app.js';
import chalk from 'chalk';
import { startDbConnection } from './app/configs/dbConfig.js';
import { startWebSocketServer } from './app/services/WebSocketServer.js';
import { NPortWSCService } from './app/services/NPortWSCService.js';

dotenv.config();

const { PORT } = process.env;

await startDbConnection();

startWebSocketServer();

await NPortWSCService.initializeWSCC();

app.listen(PORT || 3000, () => {
  console.log(chalk.green(`API iniciada em: http://localhost:${PORT}`));
});