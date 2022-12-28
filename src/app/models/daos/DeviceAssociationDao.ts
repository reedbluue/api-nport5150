import { DeviceAssociationEntitie } from "../domains/DeviceAssociationEntitie.js";
import { DeviceAssociationInterface } from "../modelsInterfaces/DeviceAssociationInterface.js";

export abstract class DeviceAssociationDao {
  public static async read(keys: Object = {}, populate?: boolean): Promise<Array<DeviceAssociationInterface> | null> {
    let association;
    if(populate) {
      association = await DeviceAssociationEntitie.find(keys, {}, {populate: ['nPortDevice', 'serialDevice']});
    } else {
      association = await DeviceAssociationEntitie.find(keys);
    }
    if(!association.length) return null;
    return association;
  }

  public static async create(model: DeviceAssociationInterface): Promise<DeviceAssociationInterface> {
    const association = await DeviceAssociationEntitie.create(model);
    return association;
  }

  public static async update(keys: Object, model: Object, populate?: boolean): Promise<Array<DeviceAssociationInterface> | null> {
    const resUpdate = await DeviceAssociationEntitie.updateMany(keys, model, {runValidators: true});
    if(!resUpdate.matchedCount) return null;
    if(populate)
      return await DeviceAssociationEntitie.find({...keys, ...model}, {}, {populate: ['nPortDevice', 'serialDevice']});
    return await DeviceAssociationEntitie.find({...keys, ...model});
  }

  public static async delete(keys: Object): Promise<number> {
    const resDelete = await DeviceAssociationEntitie.deleteMany(keys);
    return resDelete.deletedCount;
  }
}