import { getRepository, Repository } from 'typeorm'

import IAppointmentsRepositorty from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

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
