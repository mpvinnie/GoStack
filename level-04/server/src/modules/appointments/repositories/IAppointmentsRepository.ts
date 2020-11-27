import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'

interface IFindByDate {
  date: Date
  provider_id: string
}

export default interface IAppointmentsRepositorty {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: IFindByDate): Promise<Appointment | undefined>
}
