import express from 'express';
import { DeviceAssociationController } from '../controllers/DeviceAssociationController.js';

export const deviceAssociationRoutes = express.Router();

deviceAssociationRoutes.
  get('/deviceassociation', DeviceAssociationController.retornarTodosDeviceAssociations).
  get('/deviceassociation/:id', DeviceAssociationController.retornarDeviceAssociationPorId).
  get('/deviceassociation/nportdevice/:id', DeviceAssociationController.retornarDeviceAssociationPorNPortDeviceId).
  get('/deviceassociation/serialdevice/:id', DeviceAssociationController.retornarDeviceAssociationPorSerialDeviceId).
  post('/deviceassociation', DeviceAssociationController.cadastrarDeviceAssociation).
  delete('/deviceassociation/:id', DeviceAssociationController.deletarDeviceAssociationPorId).
  delete('/deviceassociation/nportdevice/:id', DeviceAssociationController.deletarTodosDeviceAssociationPorNPortDeviceId).
  delete('/deviceassociation/serialdevice/:id', DeviceAssociationController.deletarTodosDeviceAssociationPorSerialDeviceId);