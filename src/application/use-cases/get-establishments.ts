import EstablishmentDao, { EstablishmentDto } from '../dao/establishment-dao';

export default class GetEstablishments {
  constructor(private readonly establishmentDao: EstablishmentDao) {}

  async execute(): Promise<EstablishmentDto[]> {
    return this.establishmentDao.list();
  }
}
