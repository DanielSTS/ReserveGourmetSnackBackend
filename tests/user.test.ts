import BcryptPassword from '../src/domain/entities/bcrypt-password';
import Email from '../src/domain/entities/email';
import User from '../src/domain/entities/user';
import bcrypt from 'bcrypt';

describe('User', () => {
  describe('create', () => {
    it('should create a new User instance with valid password', async () => {
      const name = 'John Doe';
      const email = 'john.doe@example.com';
      const password = 'password123';

      const user = await User.create(name, email, password);

      expect(user.name).toBe(name);
      expect(user.email).toBeInstanceOf(Email);
      expect(user.password).toBeInstanceOf(BcryptPassword);
      expect(user.phone).toBeUndefined();
    });

    it('should throw an error if password is less than 8 characters', async () => {
      const name = 'John Doe';
      const email = 'john.doe@example.com';
      const password = 'pass';

      await expect(User.create(name, email, password)).rejects.toThrowError(
        'Password must have at least 8 characters.'
      );
    });
  });

  describe('restore', () => {
    it('should restore a User instance from provided data', async () => {
      const id = '123';
      const name = 'John Doe';
      const email = 'john.doe@example.com';
      const value = 'hashedPassword';
      const salt = 10;
      const phone = '1234567890';

      const user = await User.restore(id, name, email, value, salt, phone);

      expect(user.id).toBe(id);
      expect(user.name).toBe(name);
      expect(user.email).toBeInstanceOf(Email);
      expect(user.password).toBeInstanceOf(BcryptPassword);
      expect(user.phone).toBe(phone);
    });
  });

  describe('validatePassword', () => {
    it('should return true if the provided password is valid', async () => {
      const password = 'password123';
      const user = await User.create(
        'John Doe',
        'john.doe@example.com',
        password
      );

      const spy = jest.spyOn(bcrypt, 'compare');

      const result = await user.validatePassword(password);

      expect(result).toBe(true);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update the name, password, and phone of the user', async () => {
      const user = await User.create(
        'John Doe',
        'john.doe@example.com',
        'password'
      );

      const newName = 'Jane Smith';
      const newPassword = 'newPassword123';
      const newPhone = '9876543210';

      await user.update(newName, newPassword, newPhone);

      expect(user.name).toBe(newName);
      expect(user.password).toBeInstanceOf(BcryptPassword);
      expect(user.phone).toBe(newPhone);
    });
  });
});
