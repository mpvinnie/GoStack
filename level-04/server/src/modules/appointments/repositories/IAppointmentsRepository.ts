import Appointment from '../infra/typeorm/entities/Appointment'

interface IFindByDate {
  date: Date
  provider_id: string
}

export default interface IAppointmentsRepositorty {
  findByDate(date: IFindByDate): Promise<Appointment | undefined>
}
