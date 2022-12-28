import express from 'express';
import { SerialDeviceController } from '../controllers/SerialDeviceController.js';

export const serialDeviceRoutes = express.Router();

serialDeviceRoutes.
  get('/serialdevice', SerialDeviceController.retornarTodosSerialDevices).
  get('/serialdevice/id/:id', SerialDeviceController.retornarSerialDevicePorId).
  get('/serialdevice/desc/:desc', SerialDeviceController.retornarSerialDevicePorDesc).
  get('/serialdevice/id/:id/attribute', SerialDeviceController.retornarTodosAtributosPorSerialDeviceId).
  post('/serialdevice', SerialDeviceController.cadastrarSerialDevice).
  post('/serialdevice/id/:id/attribute', SerialDeviceController.adicionarAtributoPorSerialDeviceId).
  put('/serialdevice/id/:id', SerialDeviceController.atualizarSerialDevicePorId).
  put('/serialdevice/desc/:desc', SerialDeviceController.atualizarSerialDevicePorDesc).
  delete('/serialdevice/:id', SerialDeviceController.deletarSerialDevicePorId);