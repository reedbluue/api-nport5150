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
  put('/serialdevice/id/:serialDeviceId/attribute/desc/:desc', SerialDeviceController.atualizarAtributo).
  put('/serialdevice/desc/:desc', SerialDeviceController.atualizarSerialDevicePorDesc).
  delete('/serialdevice/id/:id', SerialDeviceController.deletarSerialDevicePorId).
  delete('/serialdevice/id/:serialDeviceId/attribute/desc/:desc', SerialDeviceController.deletarAtributo);