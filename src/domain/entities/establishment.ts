import Reservation from './reservation';
import { randomUUID } from 'crypto';

export default class Establishment {
  name: string;
  phone: string;
  openingHoursStart: Date;
  openingHoursEnd: Date;
  address: string;
  category: string;
  maxCapacity: number;

  constructor(
    readonly ownerId: string,
    readonly id: string,
    name: string,
    phone: string,
    openingHoursStart: Date,
    openingHoursEnd: Date,
    address: string,
    category: string,
    maxCapacity: number
  ) {
    this.validateHours(openingHoursStart, openingHoursEnd);
    this.name = name;
    this.phone = phone;
    this.openingHoursStart = openingHoursStart;
    this.openingHoursEnd = openingHoursEnd;
    this.address = address;
    this.category = category;
    this.maxCapacity = maxCapacity;
  }

  update(
    name: string,
    phone: string,
    openingHoursStart: Date,
    openingHoursEnd: Date,
    address: string,
    category: string,
    maxCapacity: number
  ) {
    this.validateHours(openingHoursStart, openingHoursEnd);
    this.name = name;
    this.phone = phone;
    this.openingHoursStart = openingHoursStart;
    this.openingHoursEnd = openingHoursEnd;
    this.address = address;
    this.category = category;
    this.maxCapacity = maxCapacity;
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

  cancelReservation(reservation: Reservation) {
    if (Date.now() > reservation.datetime.getTime()) {
      throw new Error('Invalid cancellation time');
    }
  }

  validateReservationHours(datetime: Date) {
    const time = datetime.getTime();
    if (
      time < this.openingHoursStart.getTime() ||
      time > this.openingHoursEnd.getTime()
    ) {
      throw new Error('Invalid opening hours');
    }
  }

  validateHours(openingHoursStart: Date, openingHoursEnd: Date) {
    if (openingHoursStart.getTime() >= openingHoursEnd.getTime()) {
      throw new Error('Invalid hours');
    }
  }
}
