export class RequestError extends Error {
  constructor(
    public err?: string | Error,
    public status: number = 404
  ) {
    let msg;
    if (!err) {
      msg = 'Rota inválida!';
    } else if (err instanceof Error) {
    } else {
      msg = err;
    }
    super(msg);
  }
}
