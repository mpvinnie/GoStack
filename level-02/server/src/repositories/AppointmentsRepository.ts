import Appointment from '../models/Appointment'
import { isEqual } from 'date-fns'

interface ICreateAppointmentDTO {
  provider: string
  date: Date
}

class AppointmentsRepository {
  private appointments: Appointment[]

  constructor() {
    this.appointments = []
  }

  public findByDate(date: Date): Appointment | undefined {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
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
