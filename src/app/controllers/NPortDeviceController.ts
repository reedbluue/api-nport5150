import { NextFunction, Request, Response } from "express";
import { NPortDeviceInterface } from "../models/modelsInterfaces/NPortDeviceInterface.js";
import { NPortDeviceService } from '../models/modelsServices/NPortDeviceService.js';

export abstract class NPortDeviceController {
  public static async cadastrarNPortDevice(req: Request, res: Response, next: NextFunction) {
    try {
      const model: NPortDeviceInterface = req.body;
      const nPortDevice = await NPortDeviceService.addNew(model);
      res.status(201).json(nPortDevice);
    } catch (err){
      return next(err);
    }
  }

  public static async retornarTodosNPortDevices(_req: Request, res: Response, next: NextFunction) {
    try {
      const nPortDevices = await NPortDeviceService.findAll();
      if(nPortDevices)
        return res.status(200).json(nPortDevices);
      return res.status(404).json({message: "Não existem NPortDevices cadastrados!"}); 
    } catch (err) {
      return next(err);
    }
  }

  public static async retornarNPortDevicePorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const nPortDevice = await NPortDeviceService.findById(<string>id);
      if(nPortDevice)
        return res.status(200).json(nPortDevice);
      return res.status(404).json({message: "Não existe um NPortDevices cadastrado com esse ID!"}); 
    } catch (err) {
      return next(err);
    }
  }

  public static async retornarNPortDevicePorDesc(req: Request, res: Response, next: NextFunction) {
    try {
      const { desc } = req.params;
      const nPortDevice = await NPortDeviceService.findByDesc(<string>desc);
      if(nPortDevice)
        return res.status(200).json(nPortDevice);
      return res.status(404).json({message: "Não existe um NPortDevice cadastrado com essa descrição!"}); 
    } catch (err) {
      return next(err);
    }
  }

  public static async atualizarNPortDevicePorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const model = req.body;
      if(!Object.keys(model).length)
        return res.status(400).json({message: "Os campos não podem ser nulos!"}); 
      const nPortDevices = await NPortDeviceService.updateById(<string>id, model);
      if(nPortDevices)
        return res.status(200).json(nPortDevices);
      return res.status(404).json({message: "Não existe um NPortDevices cadastrado com esse id, portanto, não foi possível atualizar!"}); 
    } catch (err) {
      return next(err);
    }
  }

  public static async atualizarNPortDevicePorDesc(req: Request, res: Response, next: NextFunction) {
    try {
      const { desc } = req.params;
      const model = req.body;
      if(!Object.keys(model).length)
        return res.status(400).json({message: "Os campos não podem ser nulos!"}); 
      const nPortDevices = await NPortDeviceService.updateByDesc(<string>desc, model);
      if(nPortDevices)
        return res.status(200).json(nPortDevices);
      return res.status(404).json({message: "Não existe um NPortDevice cadastrado com essa descrição, portanto, não foi possível atualizar!"}); 
      } catch (err) {
      return next(err);
    }
  }

  public static async deletarNPortDevicePorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const resDelete = await NPortDeviceService.deleteById(id);
      if(resDelete)
        return res.status(204).json();
      return res.status(404).json({message: "Não existe um NPortDevice cadastrado com esse id, portanto, não foi possível deletar!"}); 
    } catch (err) {
      return next(err);
    }
  }
}