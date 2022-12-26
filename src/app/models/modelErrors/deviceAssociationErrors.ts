export class DeviceAssociationError extends Error {
  constructor(err?: string | Error) {
    if(!err) {
      super('Falha na operação com o DeviceAssociation!')
    } else if(err instanceof Error) {
      super(err.message);
    } else {
      super(err);
    }
  }
}