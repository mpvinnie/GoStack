import { v4 as uuid } from 'uuid'

import IAppointmentsRepositorty from '../IAppointmentsRepository'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

interface IFindByDate {
  date: Date
  provider_id: string
}

class FakeAppointmentsRepository implements IAppointmentsRepositorty {
  private appointments: Appointment[] = []

  public async findByDate({
    date,
    provider_id
  }: IFindByDate): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.id === provider_id && appointment.date === date
    )

    return findAppointment
  }

  public async create({
    date,
    provider_id
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: uuid(), date, provider_id })

    this.appointments.push(appointment)

    return appointment
  }
}

export default FakeAppointmentsRepository
