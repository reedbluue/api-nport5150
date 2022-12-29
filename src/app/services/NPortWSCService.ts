import { Schema } from "mongoose";
import { WebSocketClientController } from "../controllers/WebSocketClientController.js";
import { NPortDeviceInterface } from "../models/modelsInterfaces/NPortDeviceInterface.js";
import { SerialDeviceInterface } from "../models/modelsInterfaces/SerialDeviceInterface.js";
import { DeviceAssociationService } from "../models/modelsServices/DeviceAssociationService.js";
import { NPortDeviceService } from "../models/modelsServices/NPortDeviceService.js";

let webSocketClientControllers = <Array<WebSocketClientController>>[];

export abstract class NPortWSCService {
  public static async initializeWSCC(): Promise<void> {
    const nPortDevices = await NPortDeviceService.findAll();
    if(!nPortDevices) return;
    const nPortDevicesWAttr = <Array<NPortDeviceInterface>>[];
    for(const device of nPortDevices) {
      const associations = await DeviceAssociationService.findAllByNPortDeviceId(<Schema.Types.ObjectId | string>device._id);
      if(associations != null)
        nPortDevicesWAttr.push(device);
    }
    if(!nPortDevices.length) return;
    for(const device of nPortDevicesWAttr) {
      const associations = await DeviceAssociationService.findAllByNPortDeviceId(<Schema.Types.ObjectId | string>device._id);
      if(!associations) continue;
      for(const association of associations) {
        webSocketClientControllers.push(new WebSocketClientController(device.ip, (<SerialDeviceInterface>association.serialDevice).port, (<Schema.Types.ObjectId | string>association._id)));
      }
    }
    if(!webSocketClientControllers.length) return;
    for(const wsClient of webSocketClientControllers) {
      wsClient.start();
    }
  }

  public static async updateWSCC() {
    for(const wSCC of webSocketClientControllers) {
      wSCC.stop();
    }
    webSocketClientControllers = [];
    await NPortWSCService.initializeWSCC();
  }
}