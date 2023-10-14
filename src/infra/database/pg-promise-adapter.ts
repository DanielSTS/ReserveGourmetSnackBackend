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
    const connectionString =
      process.env.NODE_ENV === 'test'
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL;

    this.pgp = pgp(initOptions)(String(connectionString));
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

  async close(): Promise<void> {
    await this.pgp.$pool.end();
  }

  async clear(): Promise<void> {
    const clearTablesQuery = `
      TRUNCATE TABLE public.owner_establishment, public.reserve_user, public.establishment,
                   public.reservation, public.faq, public.comment, public.review RESTART IDENTITY;
    `;

    await this.pgp.query(clearTablesQuery);
  }
}
