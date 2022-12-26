import express from 'express';
import { NPortDeviceController } from '../controllers/NPortDeviceController.js';

export const nPortDeviceRoutes = express.Router();

nPortDeviceRoutes.
  get('/nportdevice', NPortDeviceController.retornarTodosNPortDevices).
  get('/nportdevice', NPortDeviceController.retornarNPortDevicePorId).
  get('/nportdevice', NPortDeviceController.retornarNPortDevicePorDesc).
  post('nportdevice', NPortDeviceController.cadastrarNPortDevice).
  put('/nportdevice', NPortDeviceController.atualizarNPortDevicePorId).
  put('/nportdevice', NPortDeviceController.atualizarNPortDevicePorDesc).
  delete('/nportdevice/:id', NPortDeviceController.deletarNPortDevicePorId);