import ReservationDao, {
  ReservationDto
} from '../../application/daos/reservation-dao';
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
  async listByOwnerId(ownerId: string): Promise<ReservationDto[]> {
    const query = `
      SELECT r.id, r.user_id, u.name, r.datetime, r.num_people, r.observation, c."text" as comment
      FROM public.reservation r
      JOIN public.reserve_user u ON r.user_id = u.id
      JOIN public.establishment e ON r.establishment_id = e.id
      JOIN public.owner_establishment oe ON e.owner_establishment_id = oe.id
      JOIN public.comment c ON r.id = c.reservation_id
      WHERE oe.id = $1
    `;
    const values = [ownerId];
    const result = await this.connection.query(query, values);

    const reservations: ReservationDto[] = result.map((row: any) => {
      return {
        id: row.id,
        userId: row.user_id,
        userName: row.name,
        datetime: row.datetime,
        numPeople: row.num_people,
        observation: row.observation,
        comment: row.comment
      };
    });

    return reservations;
  }

  async listByEstablishmentId(
    establishmentId: string
  ): Promise<ReservationDto[]> {
    const query = `
      SELECT r.id, r.user_id, u.name, r.datetime, r.num_people, r.observation, c.comment
      FROM public.reservation r
      JOIN public.reserve_user u ON r.user_id = u.id
      LEFT JOIN public.comment c ON r.id = c.reservation_id
      WHERE r.establishment_id = $1
    `;
    const values = [establishmentId];
    const result = await this.connection.query(query, values);

    const reservations: ReservationDto[] = result.map((row: any) => {
      return {
        id: row.id,
        userId: row.user_id,
        userName: row.name,
        datetime: row.datetime,
        numPeople: row.num_people,
        observation: row.observation,
        comment: row.comment
      };
    });

    return reservations;
  }
}
