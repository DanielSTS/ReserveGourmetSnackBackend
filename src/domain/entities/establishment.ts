import Reservation from './reservation';
import { randomUUID } from 'crypto';

export default class Establishment {
  private _name: string;
  private _phone: string;
  private _openingHoursStart: Date;
  private _openingHoursEnd: Date;
  private _address: string;
  private _category: string;
  private _maxCapacity: number;
  private _enabled: boolean;

  constructor(
    readonly ownerId: string,
    readonly id: string,
    name: string,
    phone: string,
    openingHoursStart: Date,
    openingHoursEnd: Date,
    address: string,
    category: string,
    maxCapacity: number,
    enabled: boolean
  ) {
    this.validateHours(openingHoursStart, openingHoursEnd);
    this._name = name;
    this._phone = phone;
    this._openingHoursStart = openingHoursStart;
    this._openingHoursEnd = openingHoursEnd;
    this._address = address;
    this._category = category;
    this._maxCapacity = maxCapacity;
    this._enabled = enabled;
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
    this._name = name;
    this._phone = phone;
    this._openingHoursStart = openingHoursStart;
    this._openingHoursEnd = openingHoursEnd;
    this._address = address;
    this._category = category;
    this._maxCapacity = maxCapacity;
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
    const openingHoursStart = new Date(this._openingHoursStart.getTime());
    const openingHoursEnd = new Date(this._openingHoursEnd.getTime());

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

  get name() {
    return this._name;
  }

  get phone() {
    return this._phone;
  }

  get openingHoursStart() {
    return this._openingHoursStart;
  }

  get openingHoursEnd() {
    return this._openingHoursEnd;
  }

  get address() {
    return this._address;
  }

  get category() {
    return this._category;
  }

  get maxCapacity() {
    return this._maxCapacity;
  }

  get enabled() {
    return this._enabled;
  }
}
