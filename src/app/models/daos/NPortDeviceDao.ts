import { NPortDeviceEntitie } from "../domains/NPortDeviceEntitie.js";
import { NPortDeviceInterface } from "../modelsInterfaces/NPortDeviceInterface.js";

export abstract class NPortDeviceDao {
  public static async read(keys: Object = {}): Promise<Array<NPortDeviceInterface> | null> {
    const devices = await NPortDeviceEntitie.find(keys);
    if(!devices.length) return null;
    return devices
  }

  public static async create(model: NPortDeviceInterface): Promise<NPortDeviceInterface> {
    const device = await NPortDeviceEntitie.create(model);
    return device;
  }

  public static async update(keys: Object, model: Object): Promise<Array<NPortDeviceInterface> | null> {
    const resUpdate = await NPortDeviceEntitie.updateMany(keys, model, { runValidators: true });
    if(!resUpdate.matchedCount) return null;
    return await NPortDeviceEntitie.find({...keys, ...model});
  }

  public static async delete(keys: Object): Promise<number> {
    const resDelete = await NPortDeviceEntitie.deleteMany(keys);
    return resDelete.deletedCount;
  }
}