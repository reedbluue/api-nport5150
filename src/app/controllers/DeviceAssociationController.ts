import { NextFunction, Request, Response } from "express";
import { DeviceAssociationInterface } from "../models/modelsInterfaces/DeviceAssociationInterface.js";
import { DeviceAssociationService } from '../models/modelsServices/DeviceAssociationService.js';

export abstract class DeviceAssociationController {
  public static async cadastrarDeviceAssociation(req: Request<DeviceAssociationInterface>, res: Response, next: NextFunction) {
    try {
      const deviceAssociation = await DeviceAssociationService.addNew(req.body);
      res.status(200).json({ message: 'DeviceAssociation cadastrado com sucesso!', deviceAssociation: deviceAssociation });
    } catch (err) {
      next(err);
    }
  }

  public static async retornarTodosDeviceAssociations(_req: Request, res: Response, next: NextFunction) {
    try {
    const deviceAssociations = await DeviceAssociationService.findAll();
    res.status(200).json(deviceAssociations);
    } catch (err) {
      next(err);
    }
  }

  public static async retornarDeviceAssociationPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deviceAssociation = await DeviceAssociationService.findById(<string>id);
      res.status(200).json(deviceAssociation);
    } catch (err) {
      next(err);
    }
  }

  public static async retornarDeviceAssociationPorNPortDeviceId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deviceAssociation = await DeviceAssociationService.findAllByNPortDeviceId(<string>id);
      res.status(200).json(deviceAssociation);
    } catch (err) {
      next(err);
    }
  }

  public static async retornarDeviceAssociationPorSerialDeviceId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deviceAssociation = await DeviceAssociationService.findAllBySerialDeviceId(<string>id);
      res.status(200).json(deviceAssociation);
    } catch (err) {
      next(err);
    }
  }

  public static async deletarDeviceAssociationPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await DeviceAssociationService.deleteById(id);
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }

  public static async deletarTodosDeviceAssociationPorSerialDeviceId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await DeviceAssociationService.deleteBySerialDeviceId(id);
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }

  public static async deletarTodosDeviceAssociationPorNPortDeviceId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await DeviceAssociationService.deleteAllByNPortDeviceId(id);
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }
}