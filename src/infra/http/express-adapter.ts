import express from 'express';
import HttpServer, { fn } from './http-server';
import cors from 'cors';
import AuthenticateMiddleware from './auth-middleware';

export default class ExpressAdapter implements HttpServer {
  private app: any;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
  }

  on(method: string, url: string, callback: fn, auth: boolean = true): void {
    if (auth) {
      this.app[method](
        url,
        AuthenticateMiddleware,
        ExpressAdapter.process(callback)
      );
    } else {
      this.app[method](url, ExpressAdapter.process(callback));
    }
  }

  static process(callback: fn) {
    return async function (req: any, res: any) {
      try {
        const output = await callback(req.params, req.body);
        res.json(output);
      } catch (error: any) {
        res.status(422).json({ message: error.message });
      }
    };
  }
  listen(port: number): void {
    this.app.listen(port, () => {
      console.log('listening on port: ', port);
    });
  }
}
