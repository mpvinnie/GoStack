import { inject, injectable } from 'tsyringe'
import Appointment from '../infra/typeorm/entities/Appointment'

import IAppointmentsRepositorty from '../repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepositorty
  ) {
    /**/
  }

  public async execute({
    provider_id,
    day,
    month,
    year
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year
      }
    )

    return appointments
  }
}

export default ListProviderAppointmentsService
