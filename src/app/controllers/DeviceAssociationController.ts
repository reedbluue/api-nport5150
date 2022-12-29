import { NextFunction, Request, Response } from "express";
import { DeviceAssociationInterface } from "../models/modelsInterfaces/DeviceAssociationInterface.js";
import { DeviceAssociationService } from '../models/modelsServices/DeviceAssociationService.js';
import { NPortWSCService } from "../services/NPortWSCService.js";

export abstract class DeviceAssociationController {

  public static async cadastrarDeviceAssociation(req: Request<DeviceAssociationInterface>, res: Response, next: NextFunction) {
    try {
      const deviceAssociation = await DeviceAssociationService.addNew(req.body);
      await NPortWSCService.updateWSCC();
      res.status(201).json(deviceAssociation );
    } catch (err) {
      return next(err);
    }
  }

  public static async retornarTodosDeviceAssociations(_req: Request, res: Response, next: NextFunction) {
    try {
    const deviceAssociations = await DeviceAssociationService.findAll();
    if(deviceAssociations)
      return res.status(200).json(deviceAssociations);
    return res.status(404).json({message: "Não existem DeviceAssociations cadastrados!"}); 
    } catch (err) {
      return next(err);
    }
  }

  public static async retornarDeviceAssociationPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deviceAssociation = await DeviceAssociationService.findById(<string>id);
      if(deviceAssociation)
        return res.status(200).json(deviceAssociation);
      return res.status(404).json({message: "Não existe um DeviceAssociation cadastrado com esse ID!"}); 
    } catch (err) {
      return next(err);
    }
  }

  public static async retornarDeviceAssociationPorNPortDeviceId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deviceAssociations = await DeviceAssociationService.findAllByNPortDeviceId(<string>id);
      if(deviceAssociations)
        return res.status(200).json(deviceAssociations);
      return res.status(404).json({message: "Não existem DeviceAssociations cadastrados para esse NPortDevice!"});
    } catch (err) {
      return next(err);
    }
  }

  public static async retornarDeviceAssociationPorSerialDeviceId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deviceAssociations = await DeviceAssociationService.findAllBySerialDeviceId(<string>id);
      if(deviceAssociations)
        return res.status(200).json(deviceAssociations);
      return res.status(404).json({message: "Não existe um DeviceAssociation cadastrado para esse SerialDevice!"});
    } catch (err) {
      return next(err);
    }
  }

  public static async deletarDeviceAssociationPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const resDelete = await DeviceAssociationService.deleteById(id);
      if(resDelete) {
        await NPortWSCService.updateWSCC();
        return res.status(204).json();
      }
      return res.status(404).json({message: "Não existe um DeviceAssociation cadastrado com esse id, portanto, não foi possível deletar!"}); 
    } catch (err) {
      return next(err);
    }
  }

  public static async deletarTodosDeviceAssociationPorSerialDeviceId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const resDelete = await DeviceAssociationService.deleteBySerialDeviceId(id);
      if(resDelete){
        await NPortWSCService.updateWSCC();
        return res.status(204).json();
      }
      return res.status(404).json({message: "Não existe um DeviceAssociation cadastrado para esse SerialDevice, portanto, não foi possível deletar!"}); 
    } catch (err) {
      return next(err);
    }
  }

  public static async deletarTodosDeviceAssociationPorNPortDeviceId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const resDelete = await DeviceAssociationService.deleteAllByNPortDeviceId(id);
      if(resDelete) {
        await NPortWSCService.updateWSCC();
        return res.status(204).json();
      }
      return res.status(404).json({message: "Não existem DeviceAssociations cadastrados para esse NPortDevice, portanto, não foi possível deletar!"}); 
    } catch (err) {
      return next(err);
    }
  }
}