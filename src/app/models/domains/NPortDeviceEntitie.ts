import mongoose from 'mongoose';
import { NPortDeviceInterface } from '../modelsInterfaces/NPortDeviceInterface.js';

const NPortDeviceSchema = new mongoose.Schema<NPortDeviceInterface>({
  desc: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  ip: {
    type: String,
    required: true,
    unique: true
  },
  amountDevices: {
    type: Number,
    required: true,
    default: 0
  }
}, {timestamps: true});

export const NPortDeviceEntitie = mongoose.model('nport-devices', NPortDeviceSchema);