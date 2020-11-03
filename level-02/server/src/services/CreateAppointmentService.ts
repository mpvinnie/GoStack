import { startOfHour } from 'date-fns'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface IRequest {
  provider: string
  date: Date
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute({ provider, date }: IRequest): Appointment {
    const appointmentDate = startOfHour(date)

    const findAppointment = this.appointmentsRepository.findByDate({
      date: appointmentDate,
      provider
    })

    if (findAppointment) {
      throw Error('This appointment is already booked')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
