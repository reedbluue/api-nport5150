import express from 'express';
import { SerialDeviceController } from '../controllers/SerialDeviceController.js';

export const serialDeviceRoutes = express.Router();

serialDeviceRoutes.
  get('/serialdevice', SerialDeviceController.retornarTodosSerialDevices).
  get('/serialdevice', SerialDeviceController.retornarSerialDevicePorId).
  get('/serialdevice', SerialDeviceController.retornarSerialDevicePorDesc).
  post('serialdevice', SerialDeviceController.cadastrarSerialDevice).
  put('/serialdevice', SerialDeviceController.atualizarSerialDevicePorId).
  put('/serialdevice', SerialDeviceController.atualizarSerialDevicePorDesc).
  delete('/serialdevice/:id', SerialDeviceController.deletarSerialDevicePorId);