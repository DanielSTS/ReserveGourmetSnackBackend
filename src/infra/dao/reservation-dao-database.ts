import ReservationDao, {
  ReservationDto
} from '../../application/dao/reservation-dao';
import Connection from '../database/connection';

export default class ReservationDaoDatabase implements ReservationDao {
  constructor(readonly connection: Connection) {}

  async listByUserId(userId: string): Promise<ReservationDto[]> {
    const query = `
    SELECT r.id, r.user_id, r.establishment_id, r.datetime, r.num_people, r.observation, e.name, e.category
    FROM public.reservation r
    JOIN public.establishment e ON r.establishment_id = e.id
    WHERE r.user_id = $1
  `;
    const values = [userId];
    const result = await this.connection.query(query, values);

    const reservations: ReservationDto[] = result.map((row: any) => {
      return {
        id: row.id,
        userId: row.user_id,
        establishmentId: row.establishment_id,
        establishmentName: row.name,
        category: row.category,
        datetime: row.datetime,
        numPeople: row.num_people,
        observation: row.observation
      };
    });

    return reservations;
  }

  async listByEstablishmentId(
    establishmentId: string
  ): Promise<ReservationDto[]> {
    const query =
      'SELECT * FROM public.reservation WHERE establishment_id = $1';
    const values = [establishmentId];
    const result = await this.connection.query(query, values);

    const reservations: ReservationDto[] = result.map((row: any) => {
      return {
        id: row.id,
        userId: row.user_id,
        establishmentId: row.establishment_id,
        datetime: row.datetime,
        numPeople: row.num_people,
        observation: row.observation
      };
    });

    return reservations;
  }
}
