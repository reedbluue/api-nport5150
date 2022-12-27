import { Error, mongo } from "mongoose";

export class NPortDeviceDbError extends Error {
  public name: string;
  public status: number;
  constructor(err?: string | Error, status?: number) {
    let actStatus = status || 400;
    if(!err) {
      super('Falha na operação com o nPortDevice no banco de dados!');
    } else if(err instanceof Error.ValidationError) {
      const keyError = err.errors[Object.keys(err.errors)[0]];
      switch (keyError.kind) {
        case'required':
          super(`O campo '${keyError.path}' não pode ser vazio!`);
          actStatus = 406;
        break;
        case'unique':
          super(`Já existe um nPortDevice com esse '${keyError.path}'!`);
          actStatus = 409;
        break;
        case'minLength':
          super(`A descrição do NPortDevice precisa ser maior que 3 caractéres!`);
          actStatus = 409;
        break;
        case'maxWidth':
          super(`A descrição do NPortDevice precisa ser até 20 caractéres!`);
          actStatus = 409;
        break;
        default:
          super(err.message);
        break;
      }
    } else if(err instanceof mongo.MongoServerError) {
      switch(err.code) {
        case 11000:
          super(`Já existe um SerialDevice com os campos "${Object.keys(err.keyValue).join(', ')}" da sua solicitação!`);
          actStatus = 409;
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
    this.name = 'NPortDeviceDbError';
    this.status = actStatus;
  }
}

export class NPortDeviceRequestError extends Error {
  public status: number;
  constructor(err?: string | Error, status?: number) {
    let actStatus = status || 400;
    if(!err) {
      super('Falha na requisição para o SerialDevice!')
    } else if(err instanceof Error) {
      super(err.message);
      let error = <Error & { status: number }>err;
      if(error.status)
        actStatus = error.status;
    } else {
      super(err);
    }
    this.status = actStatus;
  }
}