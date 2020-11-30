import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO'

interface IFindByDate {
  date: Date
  provider_id: string
}

export default interface IAppointmentsRepositorty {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: IFindByDate): Promise<Appointment | undefined>
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO
  ): Promise<Appointment[]>
  findAllInDayFromProvider(
    data: IFindAllInDayFromProviderDTO
  ): Promise<Appointment[]>
}
