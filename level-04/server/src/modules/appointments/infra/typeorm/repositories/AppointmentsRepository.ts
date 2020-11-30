import { getRepository, Repository, Raw } from 'typeorm'

import IAppointmentsRepositorty from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'

interface IFindByDateData {
  date: Date
  provider_id: string
}

class AppointmentsRepository implements IAppointmentsRepositorty {
  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDate({
    date,
    provider_id
  }: IFindByDateData): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({
      where: { date, provider_id }
    })

    return appointment
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0')

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        )
      }
    })

    return appointments
  }

  public async create({
    provider_id,
    date
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date })

    await this.ormRepository.save(appointment)

    return appointment
  }
}

export default AppointmentsRepository
