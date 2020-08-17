import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

// it = isso, isto

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    
    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    
    const user = await createUser.execute({
      name: 'leo',
      email: 'leodesa.10@gmail.com',
      password: 'leo123',
    });
    
    const response = await authenticateUser.execute({
      email: 'leodesa.10@gmail.com',
      password: 'leo123',
    });
    
    console.log(response)
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});