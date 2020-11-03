import Appointment from '../models/Appointment'
import { isEqual } from 'date-fns'

interface ICreateAppointmentDTO {
  provider: string
  date: Date
}

interface IFindByDateData {
  date: Date
  provider: string
}

class AppointmentsRepository {
  private appointments: Appointment[]

  constructor() {
    this.appointments = []
  }

  public findByDate({
    date,
    provider
  }: IFindByDateData): Appointment | undefined {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(date, appointment.date) && appointment.provider === provider
    )

    return findAppointment
  }

  public findAll(): Appointment[] {
    return this.appointments
  }

  public create({ provider, date }: ICreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date })

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentsRepository
