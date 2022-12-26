export class DbError extends Error {
  constructor(err?: string | Error) {
    if(!err) {
      super('Falha no banco de dados!')
    } else if(err instanceof Error) {
      super(err.message);
    } else {
      super(err);
    }
  }
}