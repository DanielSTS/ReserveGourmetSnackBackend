import Email from './email';
import Reservation from './reservation';

export default class Establishment {
  private readonly reservations: Reservation[] = [];
  private name: string;
  private phone: string;
  private openingHoursStart: Date;
  private openingHoursEnd: Date;
  private address: string;
  private category: string;
  constructor(
    readonly id: string,
    readonly emailAdmin: Email,
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
    email: Email,
    datetime: Date,
    numPeople: number,
    observation: string
  ) {
    if (datetime < this.openingHoursStart || datetime > this.openingHoursEnd) {
      throw new Error('Invalid opening hours');
    }
    this.validateReservationHours(datetime);
    const reservation = new Reservation(
      email,
      this.id,
      datetime,
      numPeople,
      observation
    );
    this.reservations.push(reservation);
  }

  updateReservation(
    email: Email,
    datetime: Date,
    numPeople: number,
    observation: string
  ) {
    const reservation = this.reservations.find(
      reservation => reservation.emailUser.value === email.value
    );
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    this.validateReservationHours(datetime);
    reservation.update(datetime, numPeople, observation);
  }

  cancelReservation(email: Email) {
    const index = this.reservations.findIndex(
      reservation => reservation.emailUser.value === email.value
    );
    if (index !== -1) {
      this.reservations.splice(index, 1);
    }
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
