import EstablishmentDao, { EstablishmentDto } from '../daos/establishment-dao';

export default class GetEstablishments {
  constructor(private readonly establishmentDao: EstablishmentDao) {}

  async execute(): Promise<EstablishmentDto[]> {
    const establishiments = await this.establishmentDao.list();
    return establishiments.sort((a, b) => b.rating - a.rating);
  }
}
