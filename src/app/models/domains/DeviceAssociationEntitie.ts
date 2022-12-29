import mongoose from 'mongoose';
import { ValidationHelper } from '../../helpers/ValidationHelper.js';
import { DeviceAssociationInterface } from '../modelsInterfaces/DeviceAssociationInterface.js';

const DeviceAssociationSchema = new mongoose.Schema<DeviceAssociationInterface>({
  nPortDevice: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, 'O campo "nPortDevice" não pode ser nulo!'],
    validate: {
      validator: function(v: string) { return ValidationHelper.validObjectId(v); },
      message: prop => `O ObjectId "${prop.value}" é inválido!`,
    },
    ref: 'nport-devices'
  },
  serialDevice: {
    type: mongoose.SchemaTypes.ObjectId,
    required: [true, 'O campo "serialDevice" não pode ser nulo!'],
    validate: {
      validator: function(v: string) { return ValidationHelper.validObjectId(v); },
      message: prop => `O ObjectId "${prop.value}" é inválido!`,
    },
    ref: 'serial-devices'
  },
}, {timestamps: true, strict: true});

export const DeviceAssociationEntitie = mongoose.model('devices-associations', DeviceAssociationSchema);