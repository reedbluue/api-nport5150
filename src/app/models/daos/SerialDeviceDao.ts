import { SerialDeviceEntitie } from "../domains/SerialDeviceEntitie.js";
import { SerialDeviceInterface } from "../modelsInterfaces/SerialDeviceInterface.js";

export abstract class SerialDeviceDao {
  public static async read(keys: Object = {}): Promise<Array<SerialDeviceInterface> | null> {
    const devices = await SerialDeviceEntitie.find(keys, {}, {runValidators: true, });
    if(!devices.length) return null;
    return devices;
  }

  public static async create(model: SerialDeviceInterface): Promise<SerialDeviceInterface> {
    const device = await SerialDeviceEntitie.create(model);
    return device;
  }

  public static async update(keys: Object, model: Object): Promise<Array<SerialDeviceInterface> | null> {
    const resUpdate = await SerialDeviceEntitie.updateMany(keys, model, {runValidators: true});
    if(!resUpdate.matchedCount) return null;
    return await SerialDeviceEntitie.find({...keys, ...model});
  }

  public static async delete(keys: Object): Promise<number> {
    const resDelete = await SerialDeviceEntitie.deleteMany(keys);
    return resDelete.deletedCount;
  }
}