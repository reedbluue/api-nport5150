import { Schema } from "mongoose";
import { DeviceAssociationDao } from "../daos/DeviceAssociationDao.js";
import { DeviceAssociationDbError } from "../modelErrors/deviceAssociationErrors.js";
import { DeviceAssociationInterface } from "../modelsInterfaces/DeviceAssociationInterface.js";

export abstract class DeviceAssociationService {
  public static async addNew(model: DeviceAssociationInterface) {
    try {
      const device = await DeviceAssociationDao.create(model);
      return device;
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
      return association[0];
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async findAllByNPortDeviceId(id: Schema.Types.ObjectId | string) {
    try {
      const associations = await DeviceAssociationDao.read({ nPortDevice: id }, true);
      return associations;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async findAllBySerialDeviceId(id: Schema.Types.ObjectId | string) {
    try {
      const associations = await DeviceAssociationDao.read({ serialDevice: id }, true);
      return associations;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async deleteAllByNPortDeviceId(id: Schema.Types.ObjectId | string) {
    try {
      await DeviceAssociationDao.delete({ nPortDevice: id });
      return;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }

  public static async deleteBySerialDeviceId(id: Schema.Types.ObjectId | string) {
    try {
      await DeviceAssociationDao.delete({ serialDevice: id });
      return;
    } catch (err) {
      throw new DeviceAssociationDbError(<Error>err);
    }
  }
}