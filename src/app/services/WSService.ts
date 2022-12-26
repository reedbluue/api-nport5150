import Net from 'node:net';
import dotenv from 'dotenv';

dotenv.config();

export class WSService {
  private _clientNport: Net.Socket;
  private _timeOutData: NodeJS.Timeout;
  constructor(
    public host: string,
    public port: number,
  ) {
    this._clientNport = new Net.Socket();
    this._timeOutData = setTimeout(()=>{});
  }

  public start(): void {
    try {
      setTimeout(() => {
      }, 1000);      
      this._clientNport.connect({ host: this.host, port: this.port }, () => {

        console.log('TCP connection ON!');

        this._clientNport.on('end', () => {
          console.log('TCP connection OFF!');
        });

      });

    } catch (err) {
      console.log(err);
    } 
  }

  public sendCommand(command: string): void {
    try {
      this._clientNport.write(`${command}\r`);
    } catch (err) {
      console.log(err);
    } 
  }

  public async getData(regex?: RegExp): Promise<RegExpExecArray | string | undefined > {
    return new Promise((resolve, _) => {
      this._clientNport.removeAllListeners('data');
      this._clientNport.on('data', data => {
        const dataT = data.toString();
        console.log(dataT);
        if(!regex) {
          this._clientNport.removeAllListeners('data');
          resolve(<string>dataT);
        } else {
          if(regex.test(dataT)) {
            this._clientNport.removeAllListeners('data');
            resolve(<RegExpExecArray>regex.exec(dataT));
          }
        }
      });

      clearTimeout(this._timeOutData);
      this._timeOutData = setTimeout(() => {
        resolve(undefined);
      }, 10000);

    });
  }

  public deviceOff() {
    clearTimeout(this._timeOutData);
  }
}