import { Schema } from "mongoose";
import { NPortDeviceDao } from "../daos/NPortDeviceDao.js";
import { NPortDeviceError } from "../modelErrors/nPortDeviceErrors.js";
import { NPortDeviceInterface } from "../modelsInterfaces/NPortDeviceInterface.js";

export abstract class NPortDevice {
  public static async addNew(model: NPortDeviceInterface) {
    try {
      const device = await NPortDeviceDao.create(model);
      return device;
    } catch (err) {
      throw new NPortDeviceError(<Error>err);
    }
  }

  public static async findById(_id: Schema.Types.ObjectId | string) {
    try {
      const device = await NPortDeviceDao.read({ _id }, true);
      return device[0];
    } catch (err) {
      throw new NPortDeviceError(<Error>err);
    }
  }

  public static async findByDesc(desc: string) {
    try {
      const device = await NPortDeviceDao.read({ desc }, true);
      return device[0];
    } catch (err) {
      throw new NPortDeviceError(<Error>err);
    }
  }

  public static async findByIp(ip: string) {
    try {
      const device = await NPortDeviceDao.read({ ip }, true);
      return device[0];
    } catch (err) {
      throw new NPortDeviceError(<Error>err);
    }
  }

  public static async updateById(_id: Schema.Types.ObjectId | string, model: Object) {
    try {
      const device = await NPortDeviceDao.update({ _id }, model, true);
      return device[0];
    } catch (err) {
      throw new NPortDeviceError(<Error>err);
    }
  }

  public static async deleteById(_id: Schema.Types.ObjectId | string) {
    try {
      await NPortDeviceDao.delete({ _id });
      return;
    } catch (err) {
      throw new NPortDeviceError(<Error>err);
    }
  }
}