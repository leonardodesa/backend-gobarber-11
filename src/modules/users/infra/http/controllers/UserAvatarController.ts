import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import AppError from '@shared/errors/AppError';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateUserAvatarService = container.resolve(UpdateUserAvatarService);  
  
      const user = await updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });
  
      delete user.password;
  
      return response.json(user);
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }
}

export default UserAvatarController;