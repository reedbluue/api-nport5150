import { Error, mongo } from 'mongoose';

export class RequestError extends Error {
  public name: string;
  public status: number;
  constructor(err?: string | Error, status?: number) {
    let actStatus = status || 400;
    if(!err) {
      super('Falha na operação com o SerialDevice no banco de dados!');
    } else if(err instanceof Error.ValidationError) {
      const keyError = err.errors[Object.keys(err.errors)[0]];
      switch (keyError.kind) {
        case'required':
          super(keyError.message);
          this.status = 406;
        break;
        case'unique':
          super(keyError.message);
          this.status = 409;
        break;
        case'minLength':
          super(keyError.message);
          this.status = 409;
        break;
        case'maxWidth':
          super(keyError.message);
          this.status = 409;
        break;
        default:
          super(err.message);
        break;
      }
    } else if(err instanceof Error.CastError) {
      switch(err.path) {
        case '_id':
          super(`O id "${err.value}" está em um formato inválido!`);
          this.status = 400;
        break;
        default:
          super(err.message);
        break;
      }
    } else if(err instanceof mongo.MongoServerError) {
      switch(err.code) {
        case 11000:
          super(`Já existe um SerialDevice com os campos "${Object.keys(err.keyValue).join(', ')}" da sua solicitação!`);
          this.status = 409;
        break;
        default:
          super(err.message);
        break;
      }
    } else if(err instanceof Error) {
      super(err.message);
      let error = <Error & { status: number }>err;
      if(error.status)
        actStatus = error.status;
    } else {
      super(err);
    }
    this.name = 'SerialDeviceDbError';
    this.status = actStatus;
  }
}