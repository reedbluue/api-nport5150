import dotenv from 'dotenv';
import app from './app/app.js';
import chalk from 'chalk';

dotenv.config();

const PORT = process.env.NODE_PORT || 3000;

app.listen(PORT, () => {
  console.log(chalk.green(`API iniciada em: http://localhost:${PORT}`));
});