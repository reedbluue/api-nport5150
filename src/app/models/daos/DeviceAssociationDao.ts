import { DeviceAssociationEntitie } from "../domains/DeviceAssociationEntitie";
import { DeviceAssociationInterface } from "../modelsInterfaces/DeviceAssociationInterface.js";

export abstract class DeviceAssociationDao {
  public static async read(keys: Object, populate?: boolean): Promise<Array<DeviceAssociationInterface>> {
    let devices;
    if(!populate) {
      devices = await DeviceAssociationEntitie.find(keys);
    } else {
      devices = await DeviceAssociationEntitie.find(keys, {}, {populate: ['nPortDevice', 'serialDevice']});
    }
    return devices;
  }

  public static async create(model: DeviceAssociationInterface): Promise<DeviceAssociationInterface> {
    const device = await DeviceAssociationEntitie.create(model);
    return device;
  }

  public static async update(keys: Object, model: Object, populate?: boolean): Promise<Array<DeviceAssociationInterface>> {
    const devices = await DeviceAssociationEntitie.find(keys);
    for (const device of devices) {
      await device.update(model);
    }
    if(populate)
      return await DeviceAssociationEntitie.find(keys, {}, {populate: ['nPortDevice', 'serialDevice']});
    return await DeviceAssociationEntitie.find(keys);
  }

  public static async delete(keys: Object): Promise<void> {
    const devices = await DeviceAssociationEntitie.find(keys);
    for (const device of devices) {
      await device.delete();
    }
    return;
  }
}