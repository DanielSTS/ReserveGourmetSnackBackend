import EstablishmentDao, {
  EstablishmentDto
} from '../../../application/dao/establishiment-dao';

export default class EstablishimentRepositoryInMemory
  implements EstablishmentDao
{
  private establishiments: EstablishmentDto[] = [];

  async list(): Promise<EstablishmentDto[]> {
    return this.establishiments;
  }
}
