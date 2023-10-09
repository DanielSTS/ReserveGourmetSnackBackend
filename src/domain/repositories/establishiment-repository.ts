import Establishment from '../entities/establishiment';

export default interface EstablishmentRepository {
  save(establishiment: Establishment): Promise<void>;
  list(): Promise<Establishment[]>;
  getByEmail(email: string): Promise<Establishment>;
  getById(id: string): Promise<Establishment>;
}
