import EstablishmentDao, {
  EstablishmentDto
} from '../../../application/dao/establishiment-dao';
import Connection from '../connection';

export default class EstablishimentRepositoryDatabase
  implements EstablishmentDao
{
  private establishiments: EstablishmentDto[] = [];

  constructor(readonly connection: Connection) {}

  async list(): Promise<EstablishmentDto[]> {
    return this.establishiments;
  }
}
