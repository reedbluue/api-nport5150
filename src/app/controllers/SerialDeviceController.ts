import { NextFunction, Request, Response } from "express";
import { AttributeInterface } from "../models/modelsInterfaces/AttributeInterface.js";
import { SerialDeviceInterface } from "../models/modelsInterfaces/SerialDeviceInterface.js";
import { SerialDeviceService } from '../models/modelsServices/SerialDeviceService.js';
import { AttributeDto } from "./dtos/AttributeDto.js";

export abstract class SerialDeviceController {
  public static async cadastrarSerialDevice(req: Request, res: Response, next: NextFunction) {
    try {
      const model: SerialDeviceInterface = req.body;
      model.attributes = <Array<AttributeInterface>>[];
      const serialDevice = await SerialDeviceService.addNew(model);
      res.status(201).json(serialDevice);
    } catch (err){
      return next(err);
    }
  }

  public static async retornarTodosSerialDevices(_req: Request, res: Response, next: NextFunction) {
    try {
      const serialDevices = await SerialDeviceService.findAll();
      if(serialDevices)
        return res.status(200).json(serialDevices);
      return res.status(404).json({message: "Não existem SerialDevices cadastrados!"}); 
    } catch (err) {
      return next(err);
    }
  }

  public static async retornarSerialDevicePorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const serialDevice = await SerialDeviceService.findById(<string>id);
      if(serialDevice)
        return res.status(200).json(serialDevice);
      return res.status(404).json({message: "Não existe um SerialDevices cadastrado com esse ID!"}); 
    } catch (err) {
      return next(err);
    }
  }

  public static async retornarSerialDevicePorDesc(req: Request, res: Response, next: NextFunction) {
    try {
      const { desc } = req.params;
      const serialDevice = await SerialDeviceService.findByDesc(<string>desc);
      if(serialDevice)
        return res.status(200).json(serialDevice);
      return res.status(404).json({message: "Não existe um SerialDevice cadastrado com essa descrição!"}); 
    } catch (err) {
      return next(err);
    }
  }

  public static async atualizarSerialDevicePorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const model = req.body;
      if(!Object.keys(model).length)
        return res.status(400).json({message: "Os campos não podem ser nulos!"}); 
      const serialDevices = await SerialDeviceService.updateById(<string>id, model);
      if(serialDevices)
        return res.status(200).json(serialDevices);
      return res.status(404).json({message: "Não existe um SerialDevice cadastrado com esse id, portanto, não foi possível atualizar!"}); 
    } catch (err) {
      return next(err);
    }
  }

  public static async atualizarSerialDevicePorDesc(req: Request, res: Response, next: NextFunction) {
    try {
      const { desc } = req.params;
      const model = req.body;
      if(!Object.keys(model).length)
        return res.status(400).json({message: "Os campos não podem ser nulos!"}); 
      const serialDevices = await SerialDeviceService.updateByDesc(<string>desc, model);
      if(serialDevices)
        return res.status(200).json(serialDevices);
      return res.status(404).json({message: "Não existe um SerialDevice cadastrados com essa descrição, portanto, não foi possível atualizar!"}); 
      } catch (err) {
      return next(err);
    }
  }

  public static async deletarSerialDevicePorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const resDelete = await SerialDeviceService.deleteById(id);
      if(resDelete)
        return res.status(204).json();
      return res.status(404).json({message: "Não existe um SerialDevice cadastrados com esse id, portanto, não foi possível deletar!"}); 
    } catch (err) {
      return next(err);
    }
  }

  public static async retornarTodosAtributosPorSerialDeviceId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const serialDevice = await SerialDeviceService.findById(<string>id);
      if(!serialDevice)
        return res.status(404).json({message: "Não existe um SerialDevice cadastrado com esse id!"}); 
      if(serialDevice.attributes.length)
        return res.status(200).json(serialDevice.attributes);
      return res.status(404).json({message: "Não existem atributos cadastrados para esse SerialDevice!"}); 
    } catch (err){
      return next(err);
    }
  }

  public static async adicionarAtributoPorSerialDeviceId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const serialDevice = await SerialDeviceService.findById(<string>id);
      if(!serialDevice)
        return res.status(404).json({message: "Não existe um SerialDevice cadastrado com esse id, portanto, não foi possível atualizar!"}); 
      const model: AttributeInterface = req.body;
      if(!Object.keys(model).length)
        return res.status(400).json({message: "Os campos não podem ser nulos!"}); 
      const attributesDesc = serialDevice.attributes.map(attribute => attribute.desc);
      if(attributesDesc.includes(model.desc))
        return res.status(409).json({message: "Já existe um atributo cadastrado com essa descrição para esse SerialDevice!"}); 
      const attributes = [...serialDevice.attributes, model];
      const serialDevices = await SerialDeviceService.updateById(<string>id, { attributes });
      if(serialDevices)
        return res.status(200).json(serialDevices);
      return res.status(404).json({message: "Não existe um SerialDevice cadastrado com esse id, portanto, não foi possível atualizar!"}); 
    } catch (err){
      return next(err);
    }
  }

  public static async atualizarAtributo(req: Request, res: Response, next: NextFunction) {
    try {
      const { serialDeviceId, desc } = req.params;
      const serialDevice = await SerialDeviceService.findById(<string>serialDeviceId);
      if(!serialDevice)
        return res.status(404).json({message: "Não existe um SerialDevice cadastrado com esse id, portanto, não foi possível atualizar!"}); 
      const model: AttributeInterface = req.body;
      if(!Object.keys(model).length)
        return res.status(400).json({message: "Os campos não podem ser nulos!"}); 
      const attribute = serialDevice.attributes.map(attribute => new AttributeDto(attribute)).filter(attribute => attribute.desc == desc)[0];
      if(!attribute)
        return res.status(404).json({message: "Não existe um atributo cadastrado com essa descrição para esse SerialDevice!"}); 
      const attributeRemoved = serialDevice.attributes.map(attribute => new AttributeDto(attribute)).filter(attribute => attribute.desc != desc);
      const attributes = [...attributeRemoved, {...attribute, ...model}];
      const serialDevices = await SerialDeviceService.updateById(<string>serialDeviceId, { attributes });
      if(serialDevices)
        return res.status(200).json(serialDevices);
      return res.status(404).json({message: "Não existe um SerialDevice cadastrado com esse id, portanto, não foi possível atualizar!"}); 
    } catch (err){
      return next(err);
    }
  }

  public static async deletarAtributo(req: Request, res: Response, next: NextFunction) {
    try {
      const { serialDeviceId, desc } = req.params;
      const serialDevice = await SerialDeviceService.findById(<string>serialDeviceId);
      if(!serialDevice)
        return res.status(404).json({message: "Não existe um SerialDevice cadastrado com esse id, portanto, não foi possível atualizar!"}); 
      const attribute = serialDevice.attributes.map(attribute => new AttributeDto(attribute)).filter(attribute => attribute.desc == desc)[0];
      if(!attribute)
        return res.status(404).json({message: "Não existe um atributo cadastrado com essa descrição para esse SerialDevice!"}); 
      const attributeRemoved = serialDevice.attributes.map(attribute => new AttributeDto(attribute)).filter(attribute => attribute.desc != desc);
      const attributes = attributeRemoved;
      const serialDevices = await SerialDeviceService.updateById(<string>serialDeviceId, { attributes });
      if(serialDevices)
        return res.status(200).json(serialDevices);
      return res.status(404).json({message: "Não existe um SerialDevice cadastrado com esse id, portanto, não foi possível atualizar!"}); 
    } catch (err){
      return next(err);
    }
  }
}