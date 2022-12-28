import { Schema } from 'mongoose';
import Net from 'node:net';

export class WebSocketClientController {
  private _client: Net.Socket;
  constructor(public host: string, public port: number, private _associationId: string | Schema.Types.ObjectId) {
    this._client = new Net.Socket();
    this._associationId = _associationId;
  }

  public start(): void {
    try {
      this._client.connect({ host: this.host, port: this.port }, () => {
        console.log('TCP connection ON!');

        this._client.on('end', () => {
          console.log('TCP connection OFF!');
        });

        this._client.on('error', () => {
          console.log('TCP Error!');
        });

      });
    } catch (err) {
      console.log(err);
    }
  }

  public sendCommand(command: string): void {
    try {
      this._client.write(`${command}\r`);
    } catch (err) {
      console.log(err);
    }
  }

  public async updateData(
    regex?: RegExp
  ): Promise<RegExpExecArray | string | null> {
    return new Promise((resolve, _) => {
      const _timeOutData = setTimeout(() => {
        clearTimeout(_timeOutData);
        resolve(null);
      }, 10000);
      this._client.removeAllListeners('data');
      this._client.on('data', (rawData) => {
        clearTimeout(_timeOutData);
        const stringData = rawData.toString();
        if (!regex) {
          this._client.removeAllListeners('data');
          resolve(<string>stringData);
        } else {
          if (regex.test(stringData)) {
            this._client.removeAllListeners('data');
            resolve(<RegExpExecArray>regex.exec(stringData));
          }
        }
      });
    });
  }

  public offWSC () {
    this._client.removeAllListeners();
  }
}