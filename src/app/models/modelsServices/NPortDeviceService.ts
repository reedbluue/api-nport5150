import { Schema } from "mongoose";
import { objectIdTest } from "../../helpers/objectIdTest.js";
import { NPortDeviceDao } from "../daos/NPortDeviceDao.js";
import { NPortDeviceDbError, NPortDeviceRequestError } from "../modelErrors/nPortDeviceErrors.js";
import { NPortDeviceInterface } from "../modelsInterfaces/NPortDeviceInterface.js";

export abstract class NPortDeviceService {
  public static async addNew(model: NPortDeviceInterface) {
    try {
      if(!NPortDeviceService._validIp(model))
        throw new NPortDeviceRequestError('IP com padrão inválido!');
      if(NPortDeviceService._checkDescLength(model))
        throw new NPortDeviceRequestError('O campo "desc" deve ser maior que 3 caractéres e ter até 20 caractéres!');
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
      if((typeof _id == typeof '') && !objectIdTest(<string>_id))
        throw new NPortDeviceDbError('Formato inválido do ID!');
      const device = await NPortDeviceDao.read({ _id });
      if(!device.length)
        throw new NPortDeviceDbError('NPortDevice não encontrado!');
      return device[0];
    } catch (err) {
      throw new NPortDeviceDbError(<Error>err);
    }
  }

  public static async findByDesc(desc: string) {
    try {
      const device = await NPortDeviceDao.read({ desc });
      if(!device.length)
        throw new NPortDeviceDbError('NPortDevice não encontrado!');
      return device[0];
    } catch (err) {
      throw new NPortDeviceDbError(<Error>err);
    }
  }

  public static async findByIp(ip: string) {
    try {
      const device = await NPortDeviceDao.read({ ip });
      if(!device.length)
        throw new NPortDeviceDbError('NPortDevice não encontrado!');
      return device[0];
    } catch (err) {
      throw new NPortDeviceDbError(<Error>err);
    }
  }

  public static async updateById(_id: Schema.Types.ObjectId | string, model: any) {
    try {
      if((typeof _id == typeof '') && !objectIdTest(<string>_id))
        throw new NPortDeviceDbError('Formato inválido do ID!');
      if(model.ip && !NPortDeviceService._validIp(model))
        throw new NPortDeviceRequestError('IP com padrão inválido!');
      if(model.desc && NPortDeviceService._checkDescLength(model))
        throw new NPortDeviceRequestError('O campo "desc" deve ser maior que 3 caractéres e ter até 20 caractéres!');
      const device = await NPortDeviceDao.update({ _id }, model);
      if(!device.length)
        throw new NPortDeviceDbError('NPortDevice não encontrado!');
      return device[0];
    } catch (err) {
      throw new NPortDeviceDbError(<Error>err);
    }
  }

  public static async updateByDesc(desc: string, model: any) {
    try {
      if(model.ip && !NPortDeviceService._validIp(model))
        throw new NPortDeviceRequestError('IP com padrão inválido!');
      if(model.desc && NPortDeviceService._checkDescLength(model))
        throw new NPortDeviceRequestError('O campo "desc" deve ser maior que 3 caractéres e ter até 20 caractéres!');
      const device = await NPortDeviceDao.update({ desc }, model);
      if(!device.length)
        throw new NPortDeviceDbError('NPortDevice não encontrado!');
      return device[0];
    } catch (err) {
      throw new NPortDeviceDbError(<Error>err);
    }
  }

  public static async deleteById(_id: Schema.Types.ObjectId | string) {
    try {
      if((typeof _id == typeof '') && !objectIdTest(<string>_id))
        throw new NPortDeviceDbError('Formato inválido do ID!');
      await NPortDeviceDao.delete({ _id });
      return;
    } catch (err) {
      throw new NPortDeviceDbError(<Error>err);
    }
  }

  private static _checkDescLength(model: any) {
    return model.desc.length <= 3 || model.desc.length > 20;
  }
}