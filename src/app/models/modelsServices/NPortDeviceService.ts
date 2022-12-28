import { Schema } from "mongoose";
import { NPortDeviceDao } from "../daos/NPortDeviceDao.js";
import { NPortDeviceDbError } from "../modelErrors/nPortDeviceErrors.js";
import { NPortDeviceInterface } from "../modelsInterfaces/NPortDeviceInterface.js";
import { DeviceAssociationService } from "./DeviceAssociationService.js";

export abstract class NPortDeviceService {
  public static async addNew(model: NPortDeviceInterface) {
    try {
      const device = await NPortDeviceDao.create(model);
      return device;
    } catch (err) {
      throw new NPortDeviceDbError(<Error>err);
    }
  }

  public static async findAll() {
    try {
      const devices = await NPortDeviceDao.read({});
      return devices;
    } catch (err) {
      throw new NPortDeviceDbError(<Error>err);
    }
  }

  public static async findById(_id: Schema.Types.ObjectId | string) {
    try {
      const device = await NPortDeviceDao.read({ _id });
      if(!device)
        return null;
      return device[0];
    } catch (err) {
      throw new NPortDeviceDbError(<Error>err);
    }
  }

  public static async findByDesc(desc: string) {
    try {
      const device = await NPortDeviceDao.read({ desc });
      if(!device)
        return null;
      return device[0];
    } catch (err) {
      throw new NPortDeviceDbError(<Error>err);
    }
  }

  public static async findByIp(ip: string) {
    try {
      const device = await NPortDeviceDao.read({ ip });
      if(!device)
        return null;
      return device[0];
    } catch (err) {
      throw new NPortDeviceDbError(<Error>err);
    }
  }

  public static async updateById(_id: Schema.Types.ObjectId | string, model: any) {
    try {
      const device = await NPortDeviceDao.update({ _id }, model);
      if(!device)
        return null;
      return device[0];
    } catch (err) {
      throw new NPortDeviceDbError(<Error>err);
    }
  }

  public static async updateByDesc(desc: string, model: any) {
    try {
      const device = await NPortDeviceDao.update({ desc }, model);
      if(!device)
        return null;
      return device[0];
    } catch (err) {
      throw new NPortDeviceDbError(<Error>err);
    }
  }

  public static async deleteById(_id: Schema.Types.ObjectId | string) {
    try {
      const associations = await DeviceAssociationService.findAllByNPortDeviceId(_id);
      if(associations)
        throw new NPortDeviceDbError('Não é possível excluir esse NPortDevice, pois existem associações dependentes dele!', 405);
      const resDelete = await NPortDeviceDao.delete({ _id });
      return resDelete;
    } catch (err) {
      throw new NPortDeviceDbError(<Error>err);
    }
  }
}