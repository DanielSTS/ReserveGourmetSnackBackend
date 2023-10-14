import Reservation from '../../src/domain/entities/reservation';

describe('Reservation', () => {
  const userId = 'user-id';
  const establishmentId = 'establishment-id';
  const id = 'reservation-id';
  const datetime = new Date();
  const numPeople = 3;
  const observation = 'Test observation';

  test('should create a new reservation with the given parameters', () => {
    const reservation = new Reservation(
      userId,
      establishmentId,
      id,
      datetime,
      numPeople,
      observation
    );

    expect(reservation.userId).toBe(userId);
    expect(reservation.establishmentId).toBe(establishmentId);
    expect(reservation.id).toBe(id);
    expect(reservation.datetime).toBe(datetime);
    expect(reservation.numPeople).toBe(numPeople);
    expect(reservation.observation).toBe(observation);
  });

  test('should update the reservation with the given parameters', () => {
    const newDatetime = new Date();
    const newNumPeople = 5;
    const newObservation = 'Updated observation';

    const reservation = new Reservation(
      userId,
      establishmentId,
      id,
      datetime,
      numPeople,
      observation
    );
    reservation.update(newDatetime, newNumPeople, newObservation);

    expect(reservation.datetime).toBe(newDatetime);
    expect(reservation.numPeople).toBe(newNumPeople);
    expect(reservation.observation).toBe(newObservation);
  });

  test('should throw an error if the number of people is less than 1', () => {
    const invalidNumPeople = 0;

    expect(() => {
      new Reservation(
        userId,
        establishmentId,
        id,
        datetime,
        invalidNumPeople,
        observation
      );
    }).toThrow('Invalid numPeople');
  });
});
