import { Schema } from 'mongoose';
import Net from 'node:net';
import { AttributeInterface } from '../models/modelsInterfaces/AttributeInterface.js';
import { SerialDeviceInterface } from '../models/modelsInterfaces/SerialDeviceInterface.js';
import { DeviceAssociationService } from '../models/modelsServices/DeviceAssociationService.js';
import { WebSocketServer } from '../services/WebSocketServer.js';

export class WebSocketClientController {
  private _client: Net.Socket;
  private _attributes: Array<AttributeInterface>;
  private _updateInterval: NodeJS.Timer | null;
  constructor(public host: string, public port: number, private _associationId: string | Schema.Types.ObjectId) {
    this._client = new Net.Socket({});
    this._associationId = _associationId;
    this._attributes = [];
    this._updateInterval = null;
  }

  public start(): void {
    console.log(`Client iniciado!`);
    try {
      this._client.connect({ host: this.host, port: this.port });

      this._client.on('connect', () => {
        console.log('TCP connection ON!');
        this._updateInterval = setInterval(async () => {
          await this._updateAttributes();
        }, 15000);
      });

      this._client.on('end', () => {
        console.log('TCP connection OFF!');
        clearInterval(<NodeJS.Timer>this._updateInterval);
        this._client.connect({ host: this.host, port: this.port });
      });

      this._client.on('error', err => {
        clearInterval(<NodeJS.Timer>this._updateInterval);
        this._client.connect({ host: this.host, port: this.port });
        if((<any>err).code && (<any>err).code == 'ETIMEDOUT')
          return console.log(`Timeout ao conectar em "${(<any>err).address}:${(<any>err).port}"!`);
        return console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  }

  private async _updateAttributes() {
    const association = await DeviceAssociationService.findById(this._associationId);
    if(!association)
      return;
    this._attributes = (<SerialDeviceInterface>association.serialDevice).attributes;
    this.offWSC();
    this._client.on('data', async data => {
      WebSocketServer.emit(`${(<SerialDeviceInterface>association.serialDevice).desc}>data`, data.toString());
    });
    if(!this._attributes)
      return;
    for(const attribute of this._attributes) {
      this._client.on('data', async data => {
        const value = await this._readData(data, attribute);
        WebSocketServer.emit(`${(<SerialDeviceInterface>association.serialDevice).desc}>${attribute.desc}`, value);
      });
    }
  }

  private _sendCommand(command: string): void {
    try {
      this._client.write(`${command}\r`);
    } catch (err) {
      console.log(err);
    }
  }

  public offWSC () {
    this._client.removeAllListeners();
  }

  private async _readData(rawData: Buffer, attribute: AttributeInterface) {
    const stringData = rawData.toString();
    const regex = new RegExp(attribute.regex);
    if (!regex) {
      return stringData;
    } else {
      if (regex.test(stringData))
        return regex.exec(stringData);
      return null;  
    }
  }
}

