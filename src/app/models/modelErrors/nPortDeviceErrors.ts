export class NPortDeviceError extends Error {
  constructor(err?: string | Error) {
    if(!err) {
      super('Falha na operação com o NPortDevice!')
    } else if(err instanceof Error) {
      super(err.message);
    } else {
      super(err);
    }
  }
}