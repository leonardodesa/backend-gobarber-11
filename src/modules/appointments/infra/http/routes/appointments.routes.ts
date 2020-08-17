import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/ApointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);
// SoC: Separation of Concerns (Separação e Preocupações);
// DTO - Data Transfer Object
// SOLID - SERVICES
// Rota: Receber a requisição, chamar outro arquivo, devolver a resposta

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
