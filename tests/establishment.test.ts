import Establishment from '../src/domain/entities/establishment';

describe('Establishment', () => {
  const ownerId = 'owner-id';
  const id = 'establishment-id';
  const name = 'Test Establishment';
  const phone = '123456789';
  const openingHoursStart = new Date(2022, 0, 1, 8, 0);
  const openingHoursEnd = new Date(2022, 0, 1, 18, 0);
  const address = '123 Main St';
  const category = 'Restaurant';
  const maxCapacity = 50;
  const enabled = true;
  let establishment: Establishment;

  test('should create a new establishment with the given parameters', () => {
    establishment = new Establishment(
      ownerId,
      id,
      name,
      phone,
      openingHoursStart,
      openingHoursEnd,
      address,
      category,
      maxCapacity,
      enabled
    );

    expect(establishment.ownerId).toBe(ownerId);
    expect(establishment.id).toBe(id);
    expect(establishment.name).toBe(name);
    expect(establishment.phone).toBe(phone);
    expect(establishment.openingHoursStart).toBe(openingHoursStart);
    expect(establishment.openingHoursEnd).toBe(openingHoursEnd);
    expect(establishment.address).toBe(address);
    expect(establishment.category).toBe(category);
    expect(establishment.maxCapacity).toBe(maxCapacity);
    expect(establishment.enabled).toBe(enabled);
  });

  test('should update the establishment with the given parameters', () => {
    const newOpeningHoursStart = new Date(2022, 0, 1, 9, 0); // 9:00 AM
    const newOpeningHoursEnd = new Date(2022, 0, 1, 17, 0); // 5:00 PM
    const newName = 'Updated Establishment';

    establishment = new Establishment(
      ownerId,
      id,
      name,
      phone,
      openingHoursStart,
      openingHoursEnd,
      address,
      category,
      maxCapacity,
      enabled
    );
    establishment.update(
      newName,
      phone,
      newOpeningHoursStart,
      newOpeningHoursEnd,
      address,
      category,
      maxCapacity
    );

    expect(establishment.name).toBe(newName);
    expect(establishment.openingHoursStart).toBe(newOpeningHoursStart);
    expect(establishment.openingHoursEnd).toBe(newOpeningHoursEnd);
  });

  test('should create a new reservation with the given parameters', () => {
    establishment = new Establishment(
      ownerId,
      id,
      name,
      phone,
      openingHoursStart,
      openingHoursEnd,
      address,
      category,
      maxCapacity,
      enabled
    );
    const userId = 'user-id';
    const datetime = new Date(2022, 0, 1, 10, 0);
    const numPeople = 4;
    const observation = 'Test observation';

    const reservation = establishment.createReservation(
      userId,
      datetime,
      numPeople,
      observation
    );

    expect(reservation.userId).toBe(userId);
    expect(reservation.establishmentId).toBe(id);
    expect(reservation.datetime).toBe(datetime);
    expect(reservation.numPeople).toBe(numPeople);
    expect(reservation.observation).toBe(observation);
  });

  test('should update the reservation with the given parameters', () => {
    establishment = new Establishment(
      ownerId,
      id,
      name,
      phone,
      openingHoursStart,
      openingHoursEnd,
      address,
      category,
      maxCapacity,
      enabled
    );

    const userId = 'user-id';
    const datetime = new Date(2022, 0, 1, 10, 0); // 10:00 AM
    const numPeople = 4;
    const observation = 'Test observation';

    establishment = new Establishment(
      ownerId,
      id,
      name,
      phone,
      openingHoursStart,
      openingHoursEnd,
      address,
      category,
      maxCapacity,
      enabled
    );
    const reservation = establishment.createReservation(
      userId,
      datetime,
      numPeople,
      observation
    );

    const newDatetime = new Date(2022, 0, 1, 11, 0); // 11:00 AM
    const newNumPeople = 6;
    const newObservation = 'Updated observation';

    const updatedReservation = establishment.updateReservartion(
      reservation,
      newDatetime,
      newNumPeople,
      newObservation
    );

    expect(updatedReservation.datetime).toBe(newDatetime);
    expect(updatedReservation.numPeople).toBe(newNumPeople);
    expect(updatedReservation.observation).toBe(newObservation);
  });

  test('should throw an error when cancelling a reservation with invalid time', () => {
    establishment = new Establishment(
      ownerId,
      id,
      name,
      phone,
      openingHoursStart,
      openingHoursEnd,
      address,
      category,
      maxCapacity,
      enabled
    );
    const userId = 'user-id';
    const datetime = new Date(2022, 0, 1, 10, 0);
    const numPeople = 4;
    const observation = 'Test observation';

    const reservation = establishment.createReservation(
      userId,
      datetime,
      numPeople,
      observation
    );

    jest.spyOn(global.Date, 'now').mockImplementation(() => {
      const currentTime = new Date(2022, 0, 1, 11, 0);
      return currentTime.getTime();
    });

    expect(() => {
      establishment.cancelReservation(reservation);
    }).toThrow('Invalid cancellation time');
  });
});
