import { NextFunction, Request, Response } from "express";
import { NPortDeviceInterface } from "../models/modelsInterfaces/NPortDeviceInterface.js";
import { NPortDeviceService } from '../models/modelsServices/NPortDeviceService.js';

export abstract class NPortDeviceController {
  public static async cadastrarNPortDevice(req: Request<NPortDeviceInterface>, res: Response) {
    const nPortDevice = await NPortDeviceService.addNew(req.body);
    res.status(200).json({ message: 'NPortDevice cadastrado com sucesso!', nPortDevice: nPortDevice });
  }

  public static async retornarTodosNPortDevices(req: Request, res: Response, next: NextFunction) {
    if(req.query)
      return next();
    const nPortDevices = await NPortDeviceService.findAll();
    res.status(200).json(nPortDevices);
  }

  public static async retornarNPortDevicePorId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;
    if(!id)
      return next();
    const nPortDevice = await NPortDeviceService.findById(<string>id);
    res.status(200).json(nPortDevice);
  }

  public static async retornarNPortDevicePorDesc(req: Request, res: Response, next: NextFunction) {
    const { desc } = req.query;
    if(!desc)
      return next();
    const nPortDevice = await NPortDeviceService.findByDesc(<string>desc);
    res.status(200).json(nPortDevice);
  }

  public static async atualizarNPortDevicePorId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;
    if(!id)
      return next();
    const model = req.body;
    const nPortDevices = await NPortDeviceService.updateById(<string>id, model);
    res.status(200).json(nPortDevices);
  }

  public static async atualizarNPortDevicePorDesc(req: Request, res: Response, next: NextFunction) {
    const { desc } = req.query;
    if(!desc)
      return next();
    const model = req.body;
    const nPortDevices = await NPortDeviceService.updateById(<string>desc, model);
    res.status(200).json(nPortDevices);
  }

  public static async deletarNPortDevicePorId(req: Request, res: Response) {
    const { id } = req.params;
    await NPortDeviceService.deleteById(id);
    res.status(200).json();
  }
}