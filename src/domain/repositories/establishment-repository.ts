import Establishment from '../entities/establishment';

export default interface EstablishmentRepository {
  save(establishment: Establishment): Promise<void>;
  update(establishment: Establishment): Promise<void>;
  getByEmail(email: string): Promise<Establishment>;
  getById(id: string): Promise<Establishment>;
  getByOwnerId(OwnerId: string): Promise<Establishment>;
  }
