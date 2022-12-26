import express from "express"
import { NPortController } from "../controllers/NPortController.js";

const nPortRoutes = express.Router();

nPortRoutes.
  get('/d1/peso', NPortController.lePeso).
  get('/d1/dados', NPortController.leDados).
  post('/d1/comando', NPortController.comandoPersonalizado).
  post('/d1/liga', NPortController.liga).
  post('/d1/desliga', NPortController.desliga).
  post('/d1/tara', NPortController.tara);

export default nPortRoutes;