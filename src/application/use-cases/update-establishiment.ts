import Email from '../../domain/entities/email';
import Establishment from '../../domain/entities/establishiment';
import EstablishmentRepository from '../../domain/repositories/establishiment-repository';
import UserRepository from '../../domain/repositories/user-repository';
import { randomUUID } from 'crypto';

export default class UpdateEstablishment {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly establishmentRepository: EstablishmentRepository
  ) {}

  async execute(input: Input) {
    const user = await this.userRepository.getByEmail(input.email);

    let establishiment = await this.establishmentRepository
      .getByEmail(input.email)
      .catch(() => undefined);

    if (establishiment) {
      establishiment.update(
        input.name,
        input.phone,
        input.openingHoursStart,
        input.openingHoursEnd,
        input.address,
        input.category
      );
    } else {
      establishiment = new Establishment(
        randomUUID(),
        new Email(input.email),
        input.name,
        input.phone,
        input.openingHoursStart,
        input.openingHoursEnd,
        input.address,
        input.category
      );
    }

    await this.establishmentRepository.save(establishiment);
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
