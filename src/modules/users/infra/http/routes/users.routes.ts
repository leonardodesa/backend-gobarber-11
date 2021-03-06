import { Router, response } from 'express';
import { container } from 'tsyringe';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

// Repositories
// Services 

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAuthenticated, userAvatarController.update);

export default usersRouter;
