import Establishment from '../../domain/entities/establishment';
import EstablishmentRepository from '../../domain/repositories/establishment-repository';
import UserRepository from '../../domain/repositories/user-repository';
import { randomUUID } from 'crypto';

export default class UpdateEstablishment {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly establishmentRepository: EstablishmentRepository
  ) {}

  async execute(input: Input) {
    const user = await this.userRepository.getByEmail(input.email);

    let establishment = await this.establishmentRepository
      .getByOwnerId(user.id)
      .catch(() => undefined);

    if (establishment) {
      establishment.update(
        input.name,
        input.phone,
        input.openingHoursStart,
        input.openingHoursEnd,
        input.address,
        input.category
      );
      await this.establishmentRepository.update(establishment);
    } else {
      establishment = new Establishment(
        user.id,
        randomUUID(),
        input.name,
        input.phone,
        input.openingHoursStart,
        input.openingHoursEnd,
        input.address,
        input.category
      );
      await this.establishmentRepository.save(establishment);
    }
  }
}

type Input = {
  email: string;
  name: string;
  phone: string;
  openingHoursStart: Date;
  openingHoursEnd: Date;
  address: string;
  category: string;
};
