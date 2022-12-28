// import { Schema } from "mongoose";
// import { WebSocketClient } from "./WebSocketClient.js";

// export class NportService {
//   public _clientNPort: WebSocketClient;
//   constructor(
//     public host: string,
//     public port: number,
//     public associacaoId: string | Schema.Types.ObjectId,
//   ) {
//     this._clientNPort = new WebSocketClient(this.host, this.port);
//     //this._clientNPort.start(); TODO: REMOVER
//   }

//   public async readWeight(): Promise<string | undefined> {
//     const regexWeight = /([+ | -])\s+(\d+\.\d+)\s(g)/;
//     const regexTest = await this._clientNPort.getData(regexWeight);
//     if(!regexTest || regexTest.length <= 0)
//       return;
//     return `${regexTest[1]}${regexTest[2]}${regexTest[3]}`;
//   }

//   public async readData() {
//     return await this._clientNPort.getData();
//   }

//   public turnOn() {
//     this._clientNPort.sendCommand('L');
//   }

//   public turnOff() {
//     this._clientNPort.sendCommand('D');
//   }

//   public doTare() {
//     this._clientNPort.sendCommand('T');
//   }

//   public offConfig() {
//     this._clientNPort.sendCommand('s');
//   }

//   public customCommand(command: string) {
//     this._clientNPort.sendCommand(command);
//   }
// }