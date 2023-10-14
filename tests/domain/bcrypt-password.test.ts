import bcrypt from 'bcrypt';
import BcryptPassword from '../../src/domain/entities/bcrypt-password';

describe('BcryptPassword', () => {
  let bcryptPassword: BcryptPassword;

  beforeEach(async () => {
    bcryptPassword = await BcryptPassword.create('password');
  });

  it('should create a new bcrypt password', async () => {
    const password = 'password';
    const salt = 10;

    const result = await BcryptPassword.create(password);

    expect(result).toBeInstanceOf(BcryptPassword);
    expect(result.value).toBeDefined();
    expect(result.salt).toBe(salt);
  });

  it('should restore a bcrypt password', async () => {
    const value = 'value';
    const salt = 10;

    const result = await BcryptPassword.restore(value, salt);

    expect(result).toBeInstanceOf(BcryptPassword);
    expect(result.value).toBe(value);
    expect(result.salt).toBe(salt);
  });

  it('should validate a password', async () => {
    const password = 'password';
    const spy = jest.spyOn(bcrypt, 'compare');

    const result = await bcryptPassword.validate(password);

    expect(result).toBe(true);
    expect(spy).toHaveBeenCalledWith(password, bcryptPassword.value);
  });
});
