import express from 'express';
import HttpServer from './http-server';
import cors from 'cors';

export default class ExpressAdapter implements HttpServer {
  private app: any;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  on(method: string, url: string, callback: Function): void {
    this.app[method](url, async function (req: any, res: any) {
      try {
        const output = await callback(req.params, req.body);
        console.log(output);
        res.json(output);
      } catch (e: any) {
        res.status(422).json({ message: e.message });
        console.log(e);
      }
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log('listening on port: ', port);
    });
  }
}
