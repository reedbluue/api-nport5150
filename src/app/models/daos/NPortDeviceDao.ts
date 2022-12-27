import { NPortDeviceEntitie } from "../domains/NPortDeviceEntitie.js";
import { NPortDeviceDbError } from "../modelErrors/nPortDeviceErrors.js";
import { NPortDeviceInterface } from "../modelsInterfaces/NPortDeviceInterface.js";

export abstract class NPortDeviceDao {
  public static async read(keys: Object): Promise<Array<NPortDeviceInterface>> {
    const devices = await NPortDeviceEntitie.find(keys);
    return devices
  }

  public static async create(model: NPortDeviceInterface): Promise<NPortDeviceInterface> {
    const device = await NPortDeviceEntitie.create(model);
    return device;
  }

  public static async update(keys: Object, model: Object): Promise<Array<NPortDeviceInterface>> {
    const devices = await NPortDeviceEntitie.find(keys);
    if(!devices.length)
      throw new NPortDeviceDbError('Não existe um NPortDevice cadastrado com esses campos!');
    const modifiedDevices: Array<NPortDeviceInterface> = []
    for (const device of devices) {
      await device.updateOne(model);
      const modified = await NPortDeviceEntitie.findById(device.id);
      modifiedDevices.push(<NPortDeviceInterface>modified);
    }
    return modifiedDevices;
  }

  public static async delete(keys: Object): Promise<void> {
    const devices = await NPortDeviceEntitie.find(keys);
    if(!devices.length)
      throw new NPortDeviceDbError('Não existe um NPortDevice cadastrado com esse id!');
    for (const device of devices) {
      await device.delete();
    }
    return;
  }
}