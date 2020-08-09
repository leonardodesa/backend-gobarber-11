import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AutenticateUserService from '@modules/users/services/AuthenticateUserService';

import AppError from '@shared/errors/AppError';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      
      const autenticateUser = container.resolve(AutenticateUserService);
  
      const { user, token } = await autenticateUser.execute({
        email,
        password
      });
  
      return response.json({ user, token });
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }
}

export default SessionsController;