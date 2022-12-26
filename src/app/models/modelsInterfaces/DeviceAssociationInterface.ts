import { Schema } from "mongoose";
import { NPortDeviceInterface } from "./NPortDeviceInterface.js";
import { SerialDeviceInterface } from "./SerialDeviceInterface.js";

export interface DeviceAssociationInterface {
  _id?: Schema.Types.ObjectId | string;
  nPortDevice: Schema.Types.ObjectId | string | NPortDeviceInterface;
  serialDevice: Schema.Types.ObjectId | string | SerialDeviceInterface;
}