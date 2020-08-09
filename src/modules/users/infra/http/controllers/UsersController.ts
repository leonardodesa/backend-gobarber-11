import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AutenticateUserService from '@modules/users/services/AuthenticateUserService';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import AppError from '@shared/errors/AppError';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;
  
      const createUser = container.resolve(CreateUserService);
      
      const user = await createUser.execute({
        name,
        email,
        password
      });
  
      delete user.password;
  
      return response.json(user);
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }
}

export default UsersController;