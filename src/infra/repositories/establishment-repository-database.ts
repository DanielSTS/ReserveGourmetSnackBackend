import EstablishmentRepository from '../../domain/repositories/establishment-repository';
import Connection from '../database/connection';
import Establishment from '../../domain/entities/establishment';

export default class EstablishmentRepositoryDatabase
  implements EstablishmentRepository
{
  constructor(readonly connection: Connection) {}
  async save(establishment: Establishment): Promise<void> {
    const query = `
    INSERT INTO public.establishment 
      (owner_establishment_id, id, name, phone, opening_hours_start, opening_hours_end, address, category, max_capacity, enabled)
    VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
    const values = [
      establishment.ownerId,
      establishment.id,
      establishment.name,
      establishment.phone,
      establishment.openingHoursStart,
      establishment.openingHoursEnd,
      establishment.address,
      establishment.category,
      establishment.maxCapacity,
      establishment.enabled
    ];
    await this.connection.query(query, values);
  }

  async update(establishment: Establishment): Promise<void> {
    const query = `UPDATE public.establishment SET name = $1, phone = $2, opening_hours_start = $3, opening_hours_end = $4, address = $5, category = $6, max_capacity = $7, enabled = $8 WHERE id = $9`;
    const values = [
      establishment.name,
      establishment.phone,
      establishment.openingHoursStart,
      establishment.openingHoursEnd,
      establishment.address,
      establishment.category,
      establishment.maxCapacity,
      establishment.enabled,
      establishment.id
    ];
    await this.connection.query(query, values);
  }

  async getById(id: string): Promise<Establishment> {
    const query = 'SELECT * FROM public.establishment WHERE id = $1';
    const values = [id];
    const [result] = await this.connection.query(query, values);
    if (!result) throw new Error('Establishment not found');
    return new Establishment(
      result.owner_establishment_id,
      result.id,
      result.name,
      result.phone,
      new Date(result.opening_hours_start),
      new Date(result.opening_hours_end),
      result.address,
      result.category,
      result.max_capacity,
      result.enabled
    );
  }

  async getByOwnerId(ownerId: string): Promise<Establishment> {
    const query =
      'SELECT * FROM public.establishment WHERE owner_establishment_id = $1';
    const values = [ownerId];
    const [result] = await this.connection.query(query, values);
    if (!result) throw new Error('Establishment not found');
    return new Establishment(
      result.owner_establishment_id,
      result.id,
      result.name,
      result.phone,
      new Date(result.opening_hours_start),
      new Date(result.opening_hours_end),
      result.address,
      result.category,
      result.max_capacity,
      result.enabled
    );
  }
}
