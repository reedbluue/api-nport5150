import dotenv from 'dotenv';
import app from './app/app.js';
import chalk from 'chalk';
import { createServer } from 'http';
import { startDbConnection } from './app/configs/dbConfig.js';

dotenv.config();

const { PORT } = process.env;
const httpServer = createServer(app);

await startDbConnection();

httpServer.listen(PORT || 3000, () => {
  console.log(chalk.green(`API iniciada em: http://localhost:${PORT}`));
});