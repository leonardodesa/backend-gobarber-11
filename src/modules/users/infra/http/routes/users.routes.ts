import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// Repositories
// Services 

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAuthenticated, userAvatarController.update);

export default usersRouter;
