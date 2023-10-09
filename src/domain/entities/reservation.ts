import Email from './email';

export default class Reservation {
  private datetime: Date;
  private numPeople: number;
  private observation: string;
  constructor(
    readonly emailUser: Email,
    readonly establishmentId: string,
    datetime: Date,
    numPeople: number,
    observation: string
  ) {
    this.validate(numPeople);
    this.datetime = datetime;
    this.numPeople = numPeople;
    this.observation = observation;
  }

  update(datetime: Date, numPeople: number, observation: string) {
    this.validate(numPeople);
    this.datetime = datetime;
    this.numPeople = numPeople;
    this.observation = observation;
  }

  validate(numPeople: number) {
    if (numPeople < 1) {
      throw new Error('Invalid numPeople');
    }
  }
}
