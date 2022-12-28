import Net from 'node:net';

export class WSService {
  private _clientNPort: Net.Socket;
  private _timeOutData: NodeJS.Timeout;
  constructor(
    public host: string,
    public port: number,
  ) {
    this._clientNPort = new Net.Socket();
    this._timeOutData = setTimeout(()=>{});
  }

  public start(): void {
    try {     
      this._clientNPort.connect({ host: this.host, port: this.port }, () => {

        console.log('TCP connection ON!');

        this._clientNPort.on('end', () => {
          console.log('TCP connection OFF!');
        });
      });
    } catch (err) {
      console.log(err);
    } 
  }

  public sendCommand(command: string): void {
    try {
      this._clientNPort.write(`${command}\r`);
    } catch (err) {
      console.log(err);
    } 
  }

  public async getData(regex?: RegExp): Promise<RegExpExecArray | string | undefined > {
    return new Promise((resolve, _) => {
      this._clientNPort.removeAllListeners('data');
      this._clientNPort.on('data', data => {
        const dataT = data.toString();
        console.log(dataT);
        if(!regex) {
          this._clientNPort.removeAllListeners('data');
          resolve(<string>dataT);
        } else {
          if(regex.test(dataT)) {
            this._clientNPort.removeAllListeners('data');
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