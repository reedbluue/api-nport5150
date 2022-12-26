import { NextFunction, Request, Response } from "express";
import { SerialDeviceInterface } from "../models/modelsInterfaces/SerialDeviceInterface.js";
import { SerialDeviceService } from '../models/modelsServices/SerialDeviceService.js';

export abstract class SerialDeviceController {
  public static async cadastrarSerialDevice(req: Request, res: Response) {
    const model: SerialDeviceInterface = req.body;
    const serialDevice = await SerialDeviceService.addNew(model);
    res.status(200).json({ message: 'SerialDevice cadastrado com sucesso!', serialDevice: serialDevice });
  }

  public static async retornarTodosSerialDevices(req: Request, res: Response, next: NextFunction) {
    if(req.query)
      return next();
    const serialDevices = await SerialDeviceService.findAll();
    res.status(200).json(serialDevices);
  }

  public static async retornarSerialDevicePorId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;
    if(!id)
      return next();
    const serialDevice = await SerialDeviceService.findById(<string>id);
    res.status(200).json(serialDevice);
  }

  public static async retornarSerialDevicePorDesc(req: Request, res: Response, next: NextFunction) {
    const { desc } = req.query;
    if(!desc)
      return next();
    const serialDevice = await SerialDeviceService.findByDesc(<string>desc);
    res.status(200).json(serialDevice);
  }

  public static async atualizarSerialDevicePorId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.query;
    if(!id)
      return next();
    const model = req.body;
    const serialDevices = await SerialDeviceService.updateById(<string>id, model);
    res.status(200).json(serialDevices);
  }

  public static async atualizarSerialDevicePorDesc(req: Request, res: Response, next: NextFunction) {
    const { desc } = req.query;
    if(!desc)
      return next();
    const model = req.body;
    const serialDevices = await SerialDeviceService.updateById(<string>desc, model);
    res.status(200).json(serialDevices);
  }

  public static async deletarSerialDevicePorId(req: Request, res: Response) {
    const { id } = req.params;
    await SerialDeviceService.deleteById(id);
    res.status(200).json();
  }
}