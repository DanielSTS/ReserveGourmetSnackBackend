import { sign, verify } from 'jsonwebtoken';
import User from '../src/domain/entities/user';
import TokenGenerator from '../src/domain/entities/token-generator';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn()
}));

describe('TokenGenerator', () => {
  test('should generate a token using sign', async () => {
    const user = await User.create(
      'name',
      'test@example.com',
      'BcryptPassword'
    );
    const date = new Date();

    TokenGenerator.sign(user, date);

    expect(sign).toHaveBeenCalledWith(
      {
        email: user.email.value,
        iat: date.getTime(),
        expiresIn: TokenGenerator.EXPIRES_IN
      },
      TokenGenerator.KEY
    );
  });

  test('should verify a token using verify', () => {
    const token = 'test-token';

    TokenGenerator.verify(token);

    expect(verify).toHaveBeenCalledWith(token, TokenGenerator.KEY);
  });
});
