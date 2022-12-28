import { Schema } from 'mongoose';
import { DeviceAssociationDao } from '../daos/DeviceAssociationDao.js';
import { DeviceAssociationDbError } from '../modelErrors/deviceAssociationErrors.js';
import { DeviceAssociationInterface } from '../modelsInterfaces/DeviceAssociationInterface.js';
import { NPortDeviceInterface } from '../modelsInterfaces/NPortDeviceInterface.js';
import { NPortDeviceService } from './NPortDeviceService.js';
import { SerialDeviceService } from './SerialDeviceService.js';

export abstract class DeviceAssociationService {
  public static async addNew(model: DeviceAssociationInterface) {
    try {
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
      const association = await DeviceAssociationDao.read({ _id }, true);
      if (!association) return null;
      return association[0];
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async findAllByNPortDeviceId(
    id: Schema.Types.ObjectId | string
  ) {
    try {
      const nPortDevice = await NPortDeviceService.findById(id);
      if (!nPortDevice)
        throw new DeviceAssociationDbError(
          'Não existe um NPortDevice cadastrado com esse ID!',
          404
        );
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
      const serialDevice = await SerialDeviceService.findById(id);
      if (!serialDevice)
        throw new DeviceAssociationDbError(
          'Não existe um SerialDevice cadastrado com esse ID!',
          404
        );
      const associations = await DeviceAssociationDao.read(
        { serialDevice: id },
        true
      );
      return associations;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async deleteById(_id: Schema.Types.ObjectId | string) {
    try {
      const resDelete = await DeviceAssociationDao.delete({ _id });
      return resDelete;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async deleteAllByNPortDeviceId(
    id: Schema.Types.ObjectId | string
  ) {
    try {
      const nPortDevice = await NPortDeviceService.findById(id);
      if (!nPortDevice)
        throw new DeviceAssociationDbError(
          'Não existe um NPortDevice cadastrado com esse ID!',
          404
        );
      const resDelete = await DeviceAssociationDao.delete({
        nPortDevice: nPortDevice._id,
      });
      return resDelete;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async deleteBySerialDeviceId(
    id: Schema.Types.ObjectId | string
  ) {
    try {
      const serialDevice = await SerialDeviceService.findById(id);
      if (!serialDevice)
        throw new DeviceAssociationDbError(
          'Não existe um SerialDevice cadastrado com esse ID!',
          404
        );
      const resDelete = await DeviceAssociationDao.delete({
        serialDevice: serialDevice._id,
      });
      return resDelete;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  private static async _throwIfNotValidToCreate(
    nPortDeviceId: string,
    serialDeviceId: string
  ): Promise<void> {
    const nPortDevice = await NPortDeviceService.findById(nPortDeviceId);
    if (!nPortDevice)
      throw new DeviceAssociationDbError(
        'Não existe um NPortDevice cadastrado com esse ID!',
        404
      );
    const serialDevice = await SerialDeviceService.findById(serialDeviceId);
    if (!serialDevice)
      throw new DeviceAssociationDbError(
        'Não existe um SerialDevice cadastrado com esse ID!',
        404
      );

    const serialDeviceAssociation =
      await DeviceAssociationService.findAllBySerialDeviceId(
        <Schema.Types.ObjectId | string>serialDevice._id
      );

    const nPortAssociation =
      await DeviceAssociationService.findAllByNPortDeviceId(
        <Schema.Types.ObjectId | string>nPortDevice._id
      );

    if (serialDeviceAssociation) {
      const association = <NPortDeviceInterface>(
        await NPortDeviceService.findById(
          <Schema.Types.ObjectId | string>serialDeviceAssociation[0].nPortDevice
        )
      );
      throw new DeviceAssociationDbError(
        `O SerialDevice "${serialDevice.desc}" já está associado ao NPortDevice "${association.desc}"`,
        409
      );
    }

    if (
      (nPortAssociation && nPortAssociation.length >= nPortDevice.maxDevices) ||
      (!nPortAssociation && nPortDevice.maxDevices == 0)
    )
      throw new DeviceAssociationDbError(
        `O NPortDevice "${nPortDevice.desc}" já chegou ao seu limite de ${nPortDevice.maxDevices} SerialDevices associados!`,
        406
      );
    return;
  }
}
