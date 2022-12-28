import { Error } from 'mongoose';
import { RequestError } from './RequestError.js';

export class SerialDeviceDbError extends RequestError {
  constructor(err?: string | Error, status?: number) {
    super(err, status);
  }
}