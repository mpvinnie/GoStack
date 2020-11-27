import { startOfHour } from 'date-fns'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepositorty from '../repositories/IAppointmentsRepository'

import AppError from '@shared/errors/AppError'

interface IRequest {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepositorty) {
    /**/
  }

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const findAppointment = await this.appointmentsRepository.findByDate({
      date: appointmentDate,
      provider_id
    })

    if (findAppointment) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
