import EstablishmentDao, {
  EstablishmentDto
} from '../../application/dao/establishment-dao';
import Connection from '../database/connection';

export default class EstablishmentDaoDatabase implements EstablishmentDao {
  constructor(readonly connection: Connection) {}

  async list(): Promise<EstablishmentDto[]> {
    const query = `
      SELECT
        e.*,
        COALESCE(AVG(r.rating), 0) AS rating
      FROM
        public.establishment e
        LEFT JOIN public.review r ON r.establishment_id = e.id
      GROUP BY
        e.id
    `;
    const result = await this.connection.query(query, []);

    const establishments: EstablishmentDto[] = result.map((row: any) => {
      return {
        id: row.id,
        name: row.name,
        phone: row.phone,
        openingHoursStart: row.opening_hours_start,
        openingHoursEnd: row.opening_hours_end,
        address: row.address,
        category: row.category,
        maxCapacity: row.max_capacity,
        enabled: result.enabled,
        rating: row.rating
      };
    });

    return establishments;
  }

  async getByOwnerId(id: string): Promise<EstablishmentDto> {
    const query =
      'SELECT * FROM public.establishment WHERE owner_establishment_id = $1';
    const values = [id];
    const [result] = await this.connection.query(query, values);

    if (!result) throw new Error('Establishment not found');

    const establishment: EstablishmentDto = {
      id: result.id,
      name: result.name,
      phone: result.phone,
      openingHoursStart: result.opening_hours_start,
      openingHoursEnd: result.opening_hours_end,
      address: result.address,
      category: result.category,
      maxCapacity: result.max_capacity,
      enabled: result.enabled,
      rating: 0
    };

    return establishment;
  }
}
