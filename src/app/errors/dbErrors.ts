export class DbError extends Error {
  public status: number;
  constructor(err?: string | Error) {
    if(!err) {
      super('Falha no banco de dados!')
    } else if(err instanceof Error) {
      super(err.message);
    } else {
      super(err);
    }
    this.status = 400;
  }
}