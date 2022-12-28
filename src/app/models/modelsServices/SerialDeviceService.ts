import { Schema } from "mongoose";
import { SerialDeviceDao } from "../daos/SerialDeviceDao.js";
import { SerialDeviceDbError } from "../modelErrors/serialDeviceErrors.js";
import { SerialDeviceInterface } from "../modelsInterfaces/SerialDeviceInterface.js";
import { DeviceAssociationService } from "./DeviceAssociationService.js";

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
      const devices = await SerialDeviceDao.read();
      return devices;
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }

  public static async findById(_id: Schema.Types.ObjectId | string) {
    try {
      const device = await SerialDeviceDao.read({ _id });
      if(!device)
        return null;
      return device[0];
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }

  public static async findByDesc(desc: string) {
    try {
      const device = await SerialDeviceDao.read({ desc });
      if(!device)
        return null;
      return device[0];
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }

  public static async updateById(_id: Schema.Types.ObjectId | string, model: Object) {
    try {
      const device = await SerialDeviceDao.update({ _id }, model);
      if(!device)
        return null;
      return device[0];
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }

  public static async updateByDesc(desc: string, model: Object) {
    try {
      const device = await SerialDeviceDao.update({ desc }, model);
      if(!device)
        return null;
      return device[0];
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }

  public static async deleteById(_id: Schema.Types.ObjectId | string) {
    try {
      const associations = await DeviceAssociationService.findAllBySerialDeviceId(_id);
      if(associations)
        throw new SerialDeviceDbError('Não é possível excluir esse SerialDevice, pois existem associações dependentes dele!', 405);
      const resDelete = await SerialDeviceDao.delete({ _id });
      return resDelete;
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }
}