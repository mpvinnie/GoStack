import { startOfHour, isBefore, getHours, format } from 'date-fns'
import { inject, injectable } from 'tsyringe'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepositorty from '../repositories/IAppointmentsRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'

import AppError from '@shared/errors/AppError'

interface IRequest {
  provider_id: string
  user_id: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepositorty,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {
    /**/
  }

  public async execute({
    provider_id,
    user_id,
    date
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cannot create an appointment on a past date')
    }

    if (user_id === provider_id) {
      throw new AppError('You cannot create an appointment with yourself')
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only create appointments between 8am and 5pm')
    }

    const findAppointment = await this.appointmentsRepository.findByDate({
      date: appointmentDate,
      provider_id
    })

    if (findAppointment) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate
    })

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'")

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`
    })

    return appointment
  }
}

export default CreateAppointmentService
