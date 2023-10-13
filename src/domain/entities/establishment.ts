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
    const currentTime = new Date().getTime();
    const reservationTime = reservation.datetime.getTime();

    if (currentTime > reservationTime) {
      throw new Error('Invalid cancellation time');
    }
  }

  validateReservationHours(datetime: Date) {
    const time = datetime.getTime();
    const openingHoursStart = new Date(this.openingHoursStart.getTime());
    const openingHoursEnd = new Date(this.openingHoursEnd.getTime());

    openingHoursStart.setFullYear(
      datetime.getFullYear(),
      datetime.getMonth(),
      datetime.getDate()
    );
    openingHoursEnd.setFullYear(
      datetime.getFullYear(),
      datetime.getMonth(),
      datetime.getDate()
    );

    if (
      time < openingHoursStart.getTime() ||
      time > openingHoursEnd.getTime()
    ) {
      throw new Error('Invalid opening hours');
    }
  }

  validateHours(openingHoursStart: Date, openingHoursEnd: Date) {
    const startHour = openingHoursStart.getHours();
    const startMinutes = openingHoursStart.getMinutes();
    const endHour = openingHoursEnd.getHours();
    const endMinutes = openingHoursEnd.getMinutes();

    if (
      startHour > endHour ||
      (startHour === endHour && startMinutes >= endMinutes)
    ) {
      throw new Error('Invalid hours');
    }
  }
}
