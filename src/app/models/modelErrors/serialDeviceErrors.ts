export class SerialDeviceError extends Error {
  constructor(err?: string | Error) {
    if(!err) {
      super('Falha na operação com o SerialDevice!')
    } else if(err instanceof Error) {
      super(err.message);
    } else {
      super(err);
    }
  }
}