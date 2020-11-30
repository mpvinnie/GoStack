import { v4 as uuid } from 'uuid'
import { isEqual, getMonth, getYear, getDate } from 'date-fns'

import IAppointmentsRepositorty from '../IAppointmentsRepository'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

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
      appointment =>
        appointment.id === provider_id || isEqual(appointment.date, date)
    )

    return findAppointment
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const findAppointment = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
    )

    return findAppointment
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const findAppointment = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
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
