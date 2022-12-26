import { Schema } from "mongoose";
import { SerialDeviceInterface } from "./SerialDeviceInterface.js";

export interface NPortDeviceInterface {
  _id?: Schema.Types.ObjectId | string;
  desc: string;
  ip: string;
  amountDevices: number;
  serialDevices?: Array<SerialDeviceInterface>;
}