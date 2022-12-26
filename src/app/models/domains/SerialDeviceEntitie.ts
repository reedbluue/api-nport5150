import mongoose from 'mongoose';
import { SerialDeviceInterface } from '../modelsInterfaces/SerialDeviceInterface.js';

const SerialDeviceSchema = new mongoose.Schema<SerialDeviceInterface>({
  desc: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 3,
    maxlength: 20
  },
  port: {
    type: Number,
    required: true,
  },
  amountAttributes: {
    type: Number,
    required: true,
    default: 0
  },
  attributes: {
    type: [Object],
    required: true,
    default: []
  },
}, {timestamps: true});

export const SerialDeviceEntitie = mongoose.model('serial-devices', SerialDeviceSchema);