import { EntityRepository, Repository } from 'typeorm'

import Appointment from '../models/Appointment'

interface IFindByDateData {
  date: Date
  provider: string
}

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate({
    date,
    provider
  }: IFindByDateData): Promise<Appointment | undefined> {
    const appointment = await this.findOne({ where: { date, provider } })

    return appointment
  }
}

export default AppointmentsRepository
