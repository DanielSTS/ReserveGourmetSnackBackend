import Connection from './connection';
import pgp from 'pg-promise';

export default class PgPromiseConnectionAdapter implements Connection {
  pgp: any;
  static instance: PgPromiseConnectionAdapter;

  private constructor() {
    const initOptions = {
      query(e: { query: any }) {
        console.log(e.query);
      }
    };
    this.pgp = pgp(initOptions)(String(process.env.DATABASE_URL));
  }

  static getInstance() {
    if (!PgPromiseConnectionAdapter.instance) {
      PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter();
    }
    return PgPromiseConnectionAdapter.instance;
  }

  async query(statement: string, params: any[]): Promise<any> {
    return this.pgp.query(statement, params);
  }
}
