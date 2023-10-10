import ReservationDao, {
  ReservationDto
} from '../../application/dao/reservation-dao';
import Connection from '../database/connection';

export default class ReservationDaoDatabase implements ReservationDao {
  constructor(readonly connection: Connection) {}

  async listByUserId(userId: string): Promise<ReservationDto[]> {
    const query = 'SELECT * FROM public.reservation WHERE user_id = $1';
    const values = [userId];
    const result = await this.connection.query(query, values);

    const reservations: ReservationDto[] = result.map((row: any) => {
      return {
        id: row.id,
        establishmentId: row.establishment_id,
        datetime: row.datetime,
        numPeople: row.num_people
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
        establishmentId: row.establishment_id,
        datetime: row.datetime,
        numPeople: row.num_people
      };
    });

    return reservations;
  }
}
