import { NextFunction, Request, Response } from "express";
import { DeviceAssociationInterface } from "../models/modelsInterfaces/DeviceAssociationInterface.js";
import { DeviceAssociationService } from '../models/modelsServices/DeviceAssociationService.js';

export abstract class DeviceAssociationController {
  public static async cadastrarDeviceAssociation(req: Request<DeviceAssociationInterface>, res: Response) {
    const deviceAssociation = await DeviceAssociationService.addNew(req.body);
    res.status(200).json({ message: 'DeviceAssociation cadastrado com sucesso!', deviceAssociation: deviceAssociation });
  }

  public static async retornarTodosDeviceAssociations(req: Request, res: Response, next: NextFunction) {
    if(req.query)
      return next();
    const deviceAssociations = await DeviceAssociationService.findAll();
    res.status(200).json(deviceAssociations);
  }

  public static async retornarDeviceAssociationPorId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;
    if(!id)
      return next();
    const deviceAssociation = await DeviceAssociationService.findById(<string>id);
    res.status(200).json(deviceAssociation);
  }

  public static async retornarDeviceAssociationPorNPortDeviceId(req: Request, res: Response, next: NextFunction) {
    const { nportdeviceid } = req.query;
    if(!nportdeviceid)
      return next();
    const deviceAssociation = await DeviceAssociationService.findAllByNPortDeviceId(<string>nportdeviceid);
    res.status(200).json(deviceAssociation);
  }

  public static async retornarDeviceAssociationPorSerialDeviceId(req: Request, res: Response, next: NextFunction) {
    const { serialdeviceid } = req.query;
    if(!serialdeviceid)
      return next();
    const deviceAssociation = await DeviceAssociationService.findAllBySerialDeviceId(<string>serialdeviceid);
    res.status(200).json(deviceAssociation);
  }

  public static async deletarDeviceAssociationPorSerialDeviceId(req: Request, res: Response) {
    const { id } = req.params;
    await DeviceAssociationService.deleteBySerialDeviceId(id);
    res.status(200).json();
  }

  public static async deletarDeviceAssociationPorNPortDeviceId(req: Request, res: Response) {
    const { id } = req.params;
    await DeviceAssociationService.deleteAllByNPortDeviceId(id);
    res.status(200).json();
  }
}