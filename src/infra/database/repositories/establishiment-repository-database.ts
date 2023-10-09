import EstablishmentRepository from '../../../domain/repositories/establishiment-repository';
import Establishiment from '../../../domain/entities/establishiment';
import Connection from '../connection';

export default class EstablishimentRepositoryDatabase
  implements EstablishmentRepository
{
  private establishiments: Establishiment[] = [];

  constructor (readonly connection: Connection) {
	}

  async save(establishiment: Establishiment): Promise<void> {
    this.establishiments.push(establishiment);
  }

  async list(): Promise<Establishiment[]> {
    return this.establishiments;
  }

  async getByEmail(email: string): Promise<Establishiment> {
    const establishiment = this.establishiments.find(
      establishiment => establishiment.emailAdmin.value === email
    );
    if (!establishiment) {
      throw new Error('Establishiment not found.');
    }
    return establishiment;
  }

  async getById(id: string): Promise<Establishiment> {
    const establishiment = this.establishiments.find(
      establishiment => establishiment.id === id
    );
    if (!establishiment) {
      throw new Error('Establishiment not found.');
    }
    return establishiment;
  }
}
