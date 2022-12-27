import { Schema } from "mongoose";
import { objectIdTest } from "../../helpers/objectIdTest.js";
import { ValidationHelper } from "../../helpers/validationHelper.js";
import { SerialDeviceDao } from "../daos/SerialDeviceDao.js";
import { SerialDeviceDbError, SerialDeviceRequestError } from "../modelErrors/serialDeviceErrors.js";
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
      if((typeof _id == typeof '') && !objectIdTest(<string>_id))
        throw new SerialDeviceDbError('Formato inválido do ID!');
      const device = await SerialDeviceDao.read({ _id });
      if(!device.length)
        throw new SerialDeviceDbError('SerialDevice não encontrado!');
      return device[0];
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }

  public static async findByDesc(desc: string) {
    try {
      const device = await SerialDeviceDao.read({ desc });
      if(!device.length)
        throw new SerialDeviceDbError('SerialDevice não encontrado!');
      return device[0];
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }

  public static async updateById(_id: Schema.Types.ObjectId | string, model: Object) {
    try {
      if((typeof _id == typeof '') && !objectIdTest(<string>_id))
        throw new SerialDeviceDbError('Formato inválido do ID!');
      if(SerialDeviceService._checkDescLength(model))
        throw new SerialDeviceRequestError('O campo "desc" deve ser maior que 3 caractéres e ter até 20 caractéres!');
      const device = await SerialDeviceDao.update({ _id }, model);
      if(!device.length)
        throw new SerialDeviceDbError('SerialDevice não encontrado!');
      return device[0];
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }

  public static async updateByDesc(desc: string, model: Object) {
    try {
      if(SerialDeviceService._checkDescLength(model))
        throw new SerialDeviceRequestError('O campo "desc" deve ser maior que 3 caractéres e ter até 20 caractéres!');
      const device = await SerialDeviceDao.update({ desc }, model);
      if(!device.length)
        throw new SerialDeviceDbError('SerialDevice não encontrado!');
      return device[0];
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }

  public static async deleteById(_id: Schema.Types.ObjectId | string) {
    try {
      if((typeof _id == typeof '') && !objectIdTest(<string>_id))
        throw new SerialDeviceDbError('Formato inválido do ID!');
      await SerialDeviceDao.delete({ _id });
      return;
    } catch (err) {
      throw new SerialDeviceDbError(<Error>err);
    }
  }
}