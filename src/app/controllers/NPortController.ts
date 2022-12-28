// import { Request, Response } from "express";
// import { NportService } from "../services/NPortService.js";

// const NPort = new NportService('192.168.127.254', 4001);

// export abstract class NPortController {
//   public static async lePeso(_: Request, res: Response) {
//     const weight = await NPort.readWeight();
//     res.status(200).json({ peso: weight });
//   }

//   public static async leDados(_: Request, res: Response) {
//     const data = await NPort.readData();
//     res.status(200).json({ dados: data });
//   }

//   public static liga(_: Request, res: Response) {
//     NPort.turnOn();
//     res.status(200).json();
//   }

//   public static desliga(_: Request, res: Response) {
//     NPort.turnOff();
//     res.status(200).json();
//   }
  
//   public static tara(_: Request, res: Response) {
//     NPort.doTare();
//     res.status(200).json();
//   }

//   public static comandoPersonalizado(req: Request, res: Response) {
//     const { comando } = req.body;
//     if(!comando)
//       return res.status(400).json({message: 'O campo "comando" não deve ser nulo!'});
//     NPort.customCommand( req.body.comando );
//     return res.status(200).json();
//   }
// }