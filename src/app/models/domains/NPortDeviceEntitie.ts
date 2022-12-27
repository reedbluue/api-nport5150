import mongoose from 'mongoose';
import { ValidationHelper } from '../../helpers/validationHelper.js';
import { NPortDeviceInterface } from '../modelsInterfaces/NPortDeviceInterface.js';

const NPortDeviceSchema = new mongoose.Schema<NPortDeviceInterface>({
  desc: {
    type: String,
    required: [true, 'O campo "desc" não pode ser nulo!'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v: string) { return ValidationHelper.checkLength(v, 4, 20); },
      message: prop => `A descrição "${prop.value}" deve ter de 4 a 20 caractéres!`,
    }
  },
  ip: {
    type: String,
    required: [true, 'O campo "ip" não pode ser nulo!'],
    unique: true,
    validate: {
      validator: function(v: string) { return ValidationHelper.validIp(v); },
      message: prop => `O ip "${prop.value}" é inválido!`,
    }
  },
  maxDevices: {
    type: Number,
    required: [true, 'O campo "maxDevices" não pode ser nulo!'],
    default: 0
  }
}, {timestamps: true, strict: true});

export const NPortDeviceEntitie = mongoose.model('nport-devices', NPortDeviceSchema);