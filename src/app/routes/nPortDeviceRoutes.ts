import express from 'express';
import { NPortDeviceController } from '../controllers/NPortDeviceController.js';

export const nPortDeviceRoutes = express.Router();

nPortDeviceRoutes.
  get('/nportdevice', NPortDeviceController.retornarTodosNPortDevices).
  get('/nportdevice/id/:id', NPortDeviceController.retornarNPortDevicePorId).
  get('/nportdevice/desc/:desc', NPortDeviceController.retornarNPortDevicePorDesc).
  post('/nportdevice', NPortDeviceController.cadastrarNPortDevice).
  put('/nportdevice/id/:id', NPortDeviceController.atualizarNPortDevicePorId).
  put('/nportdevice/desc/:desc', NPortDeviceController.atualizarNPortDevicePorDesc).
  delete('/nportdevice/:id', NPortDeviceController.deletarNPortDevicePorId);