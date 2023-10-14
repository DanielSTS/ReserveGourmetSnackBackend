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
    const user = await this.userRepository.getOwnerById(input.ownerId);
    user.update(input.ownerName, input.password);
    await this.userRepository.updateOwner(user);

    let establishment = await this.establishmentRepository
      .getByOwnerId(user.id)
      .catch(() => undefined);

    if (establishment) {
      establishment.update(
        input.establishmentName,
        input.phone,
        new Date(input.openingHoursStart),
        new Date(input.openingHoursEnd),
        input.address,
        input.category,
        input.maxCapacity
      );
      await this.establishmentRepository.update(establishment);
    } else {
      establishment = new Establishment(
        user.id,
        randomUUID(),
        input.establishmentName,
        input.phone,
        new Date(input.openingHoursStart),
        new Date(input.openingHoursEnd),
        input.address,
        input.category,
        input.maxCapacity,
        input.enabled
      );
      await this.establishmentRepository.save(establishment);
    }
    return establishment.id;
  }
}

type Input = {
  ownerId: string;
  ownerName: string;
  establishmentName: string;
  password: string;
  phone: string;
  maxCapacity: number;
  openingHoursStart: Date;
  openingHoursEnd: Date;
  address: string;
  category: string;
  enabled: boolean;
};
