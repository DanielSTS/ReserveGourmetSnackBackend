import Email from './email';

export default class Reservation {
  private _datetime: Date;
  private _numPeople: number;
  private _observation: string;
  constructor(
    readonly userId: string,
    readonly establishmentId: string,
    readonly id: string,
    datetime: Date,
    numPeople: number,
    observation: string
  ) {
    this.validate(numPeople);
    this._datetime = datetime;
    this._numPeople = numPeople;
    this._observation = observation;
  }

  update(datetime: Date, numPeople: number, observation: string) {
    this.validate(numPeople);
    this._datetime = datetime;
    this._numPeople = numPeople;
    this._observation = observation;
    return this;
  }

  validate(numPeople: number) {
    if (numPeople < 1) {
      throw new Error('Invalid numPeople');
    }
  }

  get datetime() {
    return this._datetime;
  }

  get numPeople() {
    return this._numPeople;
  }

  get observation() {
    return this._observation;
  }
}
