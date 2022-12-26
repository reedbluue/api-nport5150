import { Schema } from "mongoose";
import { AttributeInterface } from "./AttributeInterface.js";

export interface SerialDeviceInterface {
  _id?: Schema.Types.ObjectId | string;
  desc: string;
  port: number;
  amountAttributes: number;
  attributes: Array<AttributeInterface>;
}