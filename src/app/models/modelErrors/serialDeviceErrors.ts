import { Error } from 'mongoose';

export class SerialDeviceDbError extends Error {
  public status: number;
  constructor(err?: string | Error) {
    if(!err) {
      super('Falha na operação com o SerialDevice no banco de dados!');
      this.status = 400;
    } else if(err instanceof Error.ValidationError) {
      switch (err.errors[0].kind) {
        case'required':
          super(`O campo '${err.errors[0].path}' não pode ser vazio!`);
          this.status = 406;
        break;
        case'unique':
          super(`Já existe um SerialDevice com esse '${err.errors[0].path}'!`);
          this.status = 409;
        break;
        case'minLength':
          super(`A descrição do SerialDevice precisa ser maior que 3 caractéres!`);
          this.status = 409;
        break;
        case'maxWidth':
          super(`A descrição do SerialDevice precisa ser até 20 caractéres!`);
          this.status = 409;
        break;
        default:
          super(err.message);
          this.status = 400;
        break;
      }
    } else if(err instanceof Error) {
      super(err.message);
      this.status = 400;
    } else {
      super(err);
      this.status = 400;
    }
  }
}

export class SerialDeviceRequestError extends Error {
  public status: number;
  constructor(err?: string | Error) {
    if(!err) {
      super('Falha na requisição para o SerialDevice!')
    } else if(err instanceof Error) {
      super(err.message);
    } else {
      super(err);
    }
    this.status = 400;
  }
}