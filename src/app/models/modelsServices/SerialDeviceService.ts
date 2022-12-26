import { Schema } from "mongoose";
import { SerialDeviceDao } from "../daos/SerialDeviceDao.js";
import { SerialDeviceDbError } from "../modelErrors/serialDeviceErrors.js";
import { SerialDeviceInterface } from "../modelsInterfaces/SerialDeviceInterface.js";

export abstract class SerialDeviceService {
  public static async addNew(model: SerialDeviceInterface) {
    try {
      const device = await SerialDeviceDao.create(model);
      return device;
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }

  public static async findAll() {
    try {
      const devices = await SerialDeviceDao.read({});
      return devices;
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }

  public static async findById(_id: Schema.Types.ObjectId | string) {
    try {
      const device = await SerialDeviceDao.read({ _id });
      return device[0];
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }

  public static async findByDesc(desc: string) {
    try {
      const device = await SerialDeviceDao.read({ desc });
      return device[0];
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }

  public static async updateById(_id: Schema.Types.ObjectId | string, model: Object) {
    try {
      const device = await SerialDeviceDao.update({ _id }, model);
      return device[0];
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }

  public static async deleteById(_id: Schema.Types.ObjectId | string) {
    try {
      await SerialDeviceDao.delete({ _id });
      return;
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }
}