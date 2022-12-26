import express from 'express';
import { DeviceAssociationController } from '../controllers/DeviceAssociationController.js';

export const deviceAssociationRoutes = express.Router();

deviceAssociationRoutes.
  get('/deviceassociation', DeviceAssociationController.retornarTodosDeviceAssociations).
  get('/deviceassociation', DeviceAssociationController.retornarDeviceAssociationPorId).
  get('/deviceassociation', DeviceAssociationController.retornarDeviceAssociationPorNPortDeviceId).
  get('/deviceassociation', DeviceAssociationController.retornarDeviceAssociationPorSerialDeviceId).
  post('deviceassociation', DeviceAssociationController.cadastrarDeviceAssociation).
  delete('/deviceassociation/nportdevice/:id', DeviceAssociationController.deletarDeviceAssociationPorNPortDeviceId).
  delete('/deviceassociation/serialdevice/:id', DeviceAssociationController.deletarDeviceAssociationPorSerialDeviceId);