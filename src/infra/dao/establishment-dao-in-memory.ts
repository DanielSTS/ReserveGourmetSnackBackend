import EstablishmentDao, {
  EstablishmentDto
} from '../../application/dao/establishment-dao';

export default class EstablishmentRepositoryInMemory
  implements EstablishmentDao
{
  private establishments: EstablishmentDto[] = [];

  async list(): Promise<EstablishmentDto[]> {
    return this.establishments;
  }
}
