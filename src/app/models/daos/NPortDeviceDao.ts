import { NPortDeviceEntitie } from "../domains/NPortDeviceEntitie";
import { NPortDeviceInterface } from "../modelsInterfaces/NPortDeviceInterface.js";

export abstract class NPortDeviceDao {
  public static async read(keys: Object, populate?: boolean): Promise<Array<NPortDeviceInterface>> {
    let devices;
    if(!populate) {
      devices = await NPortDeviceEntitie.find(keys);
    } else {
      devices = await NPortDeviceEntitie.find(keys, {}, {populate: 'serialDevices'});
    }
    return devices;
  }

  public static async create(model: NPortDeviceInterface): Promise<NPortDeviceInterface> {
    const device = await NPortDeviceEntitie.create(model);
    return device;
  }

  public static async update(keys: Object, model: Object, populate?: boolean): Promise<Array<NPortDeviceInterface>> {
    const devices = await NPortDeviceEntitie.find(keys);
    for (const device of devices) {
      await device.update(model);
    }
    if(populate)
      return await NPortDeviceEntitie.find(keys, {}, {populate: 'serialDevices'});
    return await NPortDeviceEntitie.find(keys);
  }

  public static async delete(keys: Object): Promise<void> {
    const devices = await NPortDeviceEntitie.find(keys);
    for (const device of devices) {
      await device.delete();
    }
    return;
  }
}