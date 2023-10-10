import Reservation from './reservation';
import { randomUUID } from 'crypto';

export default class Establishment {
  name: string;
  phone: string;
  openingHoursStart: Date;
  openingHoursEnd: Date;
  address: string;
  category: string;
  constructor(
    readonly ownerId: string,
    readonly id: string,
    name: string,
    phone: string,
    openingHoursStart: Date,
    openingHoursEnd: Date,
    address: string,
    category: string
  ) {
    this.validateHours(openingHoursStart, openingHoursEnd);
    this.name = name;
    this.phone = phone;
    this.openingHoursStart = openingHoursStart;
    this.openingHoursEnd = openingHoursEnd;
    this.address = address;
    this.category = category;
  }

  update(
    name: string,
    phone: string,
    openingHoursStart: Date,
    openingHoursEnd: Date,
    address: string,
    category: string
  ) {
    this.validateHours(openingHoursStart, openingHoursEnd);
    this.name = name;
    this.phone = phone;
    this.openingHoursStart = openingHoursStart;
    this.openingHoursEnd = openingHoursEnd;
    this.address = address;
    this.category = category;
  }

  createReservation(
    userId: string,
    datetime: Date,
    numPeople: number,
    observation: string
  ): Reservation {
    this.validateReservationHours(datetime);
    return new Reservation(
      userId,
      this.id,
      randomUUID(),
      datetime,
      numPeople,
      observation
    );
  }

  updateReservartion(
    reservation: Reservation,
    datetime: Date,
    numPeople: number,
    observation: string
  ): Reservation {
    this.validateReservationHours(datetime);
    return reservation.update(datetime, numPeople, observation);
  }

  validateReservationHours(datetime: Date) {
    if (datetime < this.openingHoursStart || datetime > this.openingHoursEnd) {
      throw new Error('Invalid opening hours');
    }
  }

  validateHours(openingHoursStart: Date, openingHoursEnd: Date) {
    if (openingHoursStart >= openingHoursEnd) {
      throw new Error('Invalid hours');
    }
  }
}
