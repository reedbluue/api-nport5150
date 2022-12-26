import mongoose from 'mongoose';
import { DeviceAssociationInterface } from '../modelsInterfaces/DeviceAssociationInterface.js';

const DeviceAssociationSchema = new mongoose.Schema<DeviceAssociationInterface>({
  nPortDevice: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'nport-devices'
  },
  serialDevice: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'serial-devices'
  },
}, {timestamps: true});

export const DeviceAssociationEntitie = mongoose.model('devices-associations', DeviceAssociationSchema);