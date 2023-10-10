import EstablishmentDao, {
  EstablishmentDto
} from '../../application/dao/establishment-dao';
import Connection from '../database/connection';

export default class EstablishmentRepositoryDatabase
  implements EstablishmentDao
{
  constructor(readonly connection: Connection) {}

  async list(): Promise<EstablishmentDto[]> {
    const query = 'SELECT * FROM public.establishment';
    const result = await this.connection.query(query, []);

    const establishments: EstablishmentDto[] = result.map((row: any) => {
      return {
        id: row.id,
        name: row.name,
        phone: row.phone,
        openingHoursStart: row.opening_hours_start,
        openingHoursEnd: row.opening_hours_end,
        address: row.address,
        category: row.category
      };
    });

    return establishments;
  }
}
