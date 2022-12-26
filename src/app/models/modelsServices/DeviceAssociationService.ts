import { Schema } from "mongoose";
import { DeviceAssociationDao } from "../daos/DeviceAssociationDao.js";
import { DeviceAssociationError } from "../modelErrors/deviceAssociationErrors.js";
import { DeviceAssociationInterface } from "../modelsInterfaces/DeviceAssociationInterface.js";

export abstract class DeviceAssociation {
  public static async addNew(model: DeviceAssociationInterface) {
    try {
      const device = await DeviceAssociationDao.create(model);
      return device;
    } catch (err) {
      throw new DeviceAssociationError(<Error>err);
    }
  }

  public static async findById(_id: Schema.Types.ObjectId | string) {
    try {
      const device = await DeviceAssociationDao.read({ _id }, true);
      return device[0];
    } catch (err) {
      throw new DeviceAssociationError(<Error>err);
    }
  }

  public static async findAllByNPortDeviceId(id: Schema.Types.ObjectId | string) {
    try {
      const devices = await DeviceAssociationDao.read({ nPortDevice: id }, true);
      return devices;
    } catch (err) {
      throw new DeviceAssociationError(<Error>err);
    }
  }

  public static async findAllBySerialDevice(id: Schema.Types.ObjectId | string) {
    try {
      const devices = await DeviceAssociationDao.read({ serialDevice: id }, true);
      return devices;
    } catch (err) {
      throw new DeviceAssociationError(<Error>err);
    }
  }

  public static async deleteAllByNPortDeviceId(id: Schema.Types.ObjectId | string) {
    try {
      await DeviceAssociationDao.delete({ nPortDevice: id });
      return;
    } catch (err) {
      throw new DeviceAssociationError(<Error>err);
    }
  }

  public static async deleteBySerialDeviceId(id: Schema.Types.ObjectId | string) {
    try {
      await DeviceAssociationDao.delete({ serialDevice: id });
      return;
    } catch (err) {
      throw new DeviceAssociationError(<Error>err);
    }
  }
}