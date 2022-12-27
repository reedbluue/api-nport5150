import { Schema } from 'mongoose';
import { objectIdTest } from '../../helpers/objectIdTest.js';
import { DeviceAssociationDao } from '../daos/DeviceAssociationDao.js';
import {
  DeviceAssociationDbError,
  DeviceAssociationRequestError,
} from '../modelErrors/deviceAssociationErrors.js';
import { DeviceAssociationInterface } from '../modelsInterfaces/DeviceAssociationInterface.js';
import { NPortDeviceService } from './NPortDeviceService.js';
import { SerialDeviceService } from './SerialDeviceService.js';

export abstract class DeviceAssociationService {
  public static async addNew(model: DeviceAssociationInterface) {
    try {
      if (model.nPortDevice && !objectIdTest(<string>model.nPortDevice))
        throw new DeviceAssociationDbError(
          'Formato inválido do nPortDeviceId!'
        );
      if (model.serialDevice && !objectIdTest(<string>model.serialDevice))
        throw new DeviceAssociationDbError(
          'Formato inválido do serialDeviceId!'
        );
      await DeviceAssociationService._throwIfNotValidToCreate(
        <string>model.nPortDevice,
        <string>model.serialDevice
      );

      const association = await DeviceAssociationDao.create(model);
      return association;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async findAll() {
    try {
      const associations = await DeviceAssociationDao.read({});
      return associations;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async findById(_id: Schema.Types.ObjectId | string) {
    try {
      if (typeof _id == typeof '' && !objectIdTest(<string>_id))
        throw new DeviceAssociationDbError('Formato inválido do ID!');
      const association = await DeviceAssociationDao.read({ _id }, true);
      if (!association.length)
        throw new DeviceAssociationDbError('Associação não encontrada!');
      return association[0];
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async findAllByNPortDeviceId(
    id: Schema.Types.ObjectId | string
  ) {
    try {
      if (typeof id == typeof '' && !objectIdTest(<string>id))
        throw new DeviceAssociationDbError('Formato inválido do ID!');
      const nPortDevice = await NPortDeviceService.findById(id);
      if(!nPortDevice)
        throw new DeviceAssociationRequestError('Não existe um NPortDevice cadastrado com esse ID!');
      const associations = await DeviceAssociationDao.read(
        { nPortDevice: id },
        true
      );
      return associations;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async findAllBySerialDeviceId(
    id: Schema.Types.ObjectId | string
  ) {
    try {
      if (typeof id == typeof '' && !objectIdTest(<string>id))
        throw new DeviceAssociationDbError('Formato inválido do ID!');
      const serialDevice = await SerialDeviceService.findById(id);
      if(!serialDevice)
        throw new DeviceAssociationRequestError('Não existe um SerialDevice cadastrado com esse ID!');
      const associations = await DeviceAssociationDao.read(
        { serialDevice: id },
        true
      );
      return associations;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async deleteById(
    id: Schema.Types.ObjectId | string
  ) {
    try {
      if (typeof id == typeof '' && !objectIdTest(<string>id))
        throw new DeviceAssociationDbError('Formato inválido do ID!');
      await DeviceAssociationDao.delete({ _id: id });
      return;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async deleteAllByNPortDeviceId(
    id: Schema.Types.ObjectId | string
  ) {
    try {
      if (typeof id == typeof '' && !objectIdTest(<string>id))
        throw new DeviceAssociationDbError('Formato inválido do ID!');
      const nPortDevice = await NPortDeviceService.findById(id);
      await DeviceAssociationDao.delete({ nPortDevice: nPortDevice._id });
      return;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async deleteBySerialDeviceId(
    id: Schema.Types.ObjectId | string
  ) {
    try {
      if (typeof id == typeof '' && !objectIdTest(<string>id))
        throw new DeviceAssociationDbError('Formato inválido do ID!');
      await DeviceAssociationDao.delete({ serialDevice: id });
      return;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  private static async _throwIfNotValidToCreate(
    nPortDeviceId: string,
    serialDeviceId: string
  ): Promise<void> {
    const nPortDevice = await NPortDeviceService.findById(nPortDeviceId);
    const serialDevice = await SerialDeviceService.findById(serialDeviceId);

    const serialDeviceAssociation =
      await DeviceAssociationService.findAllBySerialDeviceId(
        <Schema.Types.ObjectId | string>serialDevice._id
      );

    const nPortAssociation =
      await DeviceAssociationService.findAllByNPortDeviceId(
        <Schema.Types.ObjectId | string>nPortDevice._id
      );

    if (serialDeviceAssociation.length)
      throw new DeviceAssociationRequestError(
        `O SerialDevice "${
          serialDevice.desc
        }" já está associado ao NPortDevice "${(await NPortDeviceService.findById(
          <Schema.Types.ObjectId | string>serialDeviceAssociation[0].nPortDevice
        )).desc}"`
      );

    if (nPortAssociation.length >= nPortDevice.maxDevices)
      throw new DeviceAssociationRequestError(
        `O NPortDevice "${nPortDevice.desc}" já chegou ao seu limite de ${nPortDevice.maxDevices} SerialDevices associados!`
      );
    return;
  }
}
