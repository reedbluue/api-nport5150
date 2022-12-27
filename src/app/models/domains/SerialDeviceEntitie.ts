import mongoose from 'mongoose';
import { ValidationHelper } from '../../helpers/validationHelper.js';
import { SerialDeviceInterface } from '../modelsInterfaces/SerialDeviceInterface.js';

const SerialDeviceSchema = new mongoose.Schema<SerialDeviceInterface>({
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
  port: {
    type: Number,
    required: [true, 'O campo "port" não pode ser nulo!'],
    validate: {
      validator: function(v: number) {return ValidationHelper.checkPort(v)},
      message: prop => `A porta "${prop.value}" é inválida!`
    }
  },
  attributes: {
    type: [Object],
    required: [true, 'O campo "attributes" não pode ser nulo!'],
    default: []
  },
}, {timestamps: true, strict: true});

export const SerialDeviceEntitie = mongoose.model('serial-devices', SerialDeviceSchema);