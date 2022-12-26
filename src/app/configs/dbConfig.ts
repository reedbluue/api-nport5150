import mongoose from "mongoose";
import dotenv from 'dotenv';
import { DbError } from "../errors/dbErrors.js";
import chalk from "chalk";
dotenv.config();

const { CONNECTION_STRING } = process.env;

if (!CONNECTION_STRING) throw new DbError('A string de conexão é inválida!');

mongoose.set('strictQuery', true);

mongoose.connection.on('error', (err: ErrorEvent) => {
  throw new DbError(err.error);
});

export const startDbConnection = async (): Promise<void> => {
  if(!mongoose.connection.readyState) {
    
    const timeOut = setTimeout(() => {
      throw new DbError(chalk.red('Tempo expirado para a conexão com o banco de dados!'));
    }, 10000);

    try {
      console.log('Iniciando conexão com o banco de dados!');
      await mongoose.connect(CONNECTION_STRING);
      console.log(chalk.green('Sucesso na conexão com o banco de dados!'));
      clearTimeout(timeOut);
    } catch (err) {
      clearTimeout(timeOut);
      throw new DbError(<Error>err);
    }
  }
  return;
}