import EstablishmentRepository from '../../domain/repositories/establishment-repository';
import Establishment from '../../domain/entities/establishment';

export default class EstablishmentRepositoryInMemory
  implements EstablishmentRepository
{
  private establishments: Establishment[] = [];

  async save(establishment: Establishment): Promise<void> {
    this.establishments.push(establishment);
  }

  async getByEmail(email: string): Promise<Establishment> {
    const establishment = this.establishments.find(
      establishment => establishment.ownerEmail.value === email
    );
    if (!establishment) {
      throw new Error('Establishment not found.');
    }
    return establishment;
  }

  async getById(id: string): Promise<Establishment> {
    const establishment = this.establishments.find(
      establishment => establishment.ownerId === id
    );
    if (!establishment) {
      throw new Error('Establishment not found.');
    }
    return establishment;
  }
}
