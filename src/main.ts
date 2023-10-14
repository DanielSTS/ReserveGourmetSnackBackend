import 'dotenv/config';
import ExpressAdapter from './infra/http/express-adapter';
import Router from './infra/http/router';
import RepositoryFactoryDatabase from './infra/repositories/repository-factory-database';
import DaoFactoryDatabase from './infra/daos/dao-factory-database';

const expressAdapter = new ExpressAdapter();
const repositoryFactory = new RepositoryFactoryDatabase();
const daoFactory = new DaoFactoryDatabase();
new Router(expressAdapter, repositoryFactory, daoFactory);
expressAdapter.listen(Number(process.env.PORT));
