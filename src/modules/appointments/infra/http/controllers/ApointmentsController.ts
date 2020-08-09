import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe'

import AppError from '@shared/errors/AppError';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      // transforma dados fica aqui
      // lógica de negócio fica em outro arquivo / repository ou service;
      const { provider_id, date } = request.body;
  
      const parsedDate = parseISO(date);
  
      const createdAppointment = container.resolve(CreateAppointmentService);
      // const createdAppointment = new CreateAppointmentService();
  
      const appointment = await createdAppointment.execute({
        date: parsedDate,
        provider_id,
      });
  
      return response.json(appointment);
    } catch (err) {
      throw new AppError(err.message, err.statusCode);
    }
  }
}

export default AppointmentsController;