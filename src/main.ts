import 'dotenv/config';
import ExpressAdapter from './infra/http/express-adapter';
import Router from './infra/http/router';
import RepositoryFactoryDatabase from './infra/database/repositories/repository-factory-database';
import PgPromiseConnectionAdapter from './infra/database/pg-promise-adapter';

const connection = PgPromiseConnectionAdapter.getInstance();
const repositoryFactory = new RepositoryFactoryDatabase();
const expressAdapter = new ExpressAdapter();
new Router(expressAdapter, repositoryFactory);
expressAdapter.listen(3000);
