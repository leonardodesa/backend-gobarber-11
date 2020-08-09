import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'; 

import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  date: Date;
  provider_id: string;
}

// SOLID
// SINGLE RESPONSABILITY pRINCIPLE
// DEPENDENCY INVERTION pRINCIPLE

//  REPOSITORY PARA TRATAR OS DADOS
// UMA ÚNICA RESPOSABILIDADE POR ARQUIVO,
// UM SERVICE PARA CRIAR ALGO
// A ROTA APENAS PEGA A REQUISIÇÃO, PARSED NOS DADOS E RETORNA O DADO;
// UM REPOSITORIO PARA TRANSF

// soliD

@injectable()// Dependecy inversion 
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ date, provider_id }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
