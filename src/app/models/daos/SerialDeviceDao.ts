import { SerialDeviceEntitie } from "../domains/SerialDeviceEntitie";
import { SerialDeviceInterface } from "../modelsInterfaces/SerialDeviceInterface.js";

export abstract class SerialDeviceDao {
  public static async read(keys: Object): Promise<Array<SerialDeviceInterface>> {
    const devices = await SerialDeviceEntitie.find(keys);
    return devices;
  }

  public static async create(model: SerialDeviceInterface): Promise<SerialDeviceInterface> {
    const device = await SerialDeviceEntitie.create(model);
    return device;
  }

  public static async update(keys: Object, model: Object): Promise<Array<SerialDeviceInterface>> {
    const devices = await SerialDeviceEntitie.find(keys);
    for (const device of devices) {
      await device.update(model);
    }
    return await SerialDeviceEntitie.find(keys);
  }

  public static async delete(keys: Object): Promise<void> {
    const devices = await SerialDeviceEntitie.find(keys);
    for (const device of devices) {
      await device.delete();
    }
    return;
  }
}