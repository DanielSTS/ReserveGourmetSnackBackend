import ReservationRepository from '../../domain/repositories/reservation-repository';
import Connection from '../database/connection';
import Reservation from '../../domain/entities/reservation';

export default class ReservationRepositoryDatabase
  implements ReservationRepository
{
  constructor(readonly connection: Connection) {}
  async save(reservation: Reservation): Promise<void> {
    const query = `
    INSERT INTO public.reservation 
      (establishment_id, user_id, id, datetime, num_people, observation)
    VALUES 
      ($1, $2, $3, $4, $5, $6)`;
    const values = [
      reservation.establishmentId,
      reservation.userId,
      reservation.id,
      reservation.datetime,
      reservation.numPeople,
      reservation.observation
    ];
    await this.connection.query(query, values);
  }

  async update(reservation: Reservation): Promise<void> {
    const query = `UPDATE public.reservation SET datetime = $1, num_people = $2, observation = $3 WHERE id = $4`;
    const values = [
      reservation.datetime,
      reservation.numPeople,
      reservation.observation
    ];
    await this.connection.query(query, values);
  }

  async getById(id: string): Promise<Reservation> {
    const query = 'SELECT * FROM public.reservation WHERE id = $1';
    const values = [id];
    const [result] = await this.connection.query(query, values);
    if (!result) throw new Error('Reservation not found');
    return new Reservation(
      result.user_id,
      result.owner_establishment_id,
      result.id,
      result.datetime,
      result.num_people,
      result.observation
    );
  }
}
