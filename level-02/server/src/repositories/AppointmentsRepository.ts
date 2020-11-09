import { EntityRepository, Repository } from 'typeorm'

import Appointment from '../models/Appointment'

interface IFindByDateData {
  date: Date
  provider_id: string
}

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate({
    date,
    provider_id
  }: IFindByDateData): Promise<Appointment | undefined> {
    const appointment = await this.findOne({ where: { date, provider_id } })

    return appointment
  }
}

export default AppointmentsRepository
