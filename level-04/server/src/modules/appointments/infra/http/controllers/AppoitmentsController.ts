import { Request, Response } from 'express'
import { parseISO } from 'date-fns'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

export default class AppointmentsController {
  // public async index(request: Request, response: Response): Promise<Response> {
  //   const appointments = await appointmentsRepository.find()

  //   return response.json(appointments)
  // }

  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const appointmentsRepository = new AppointmentsRepository()
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    )

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id
    })

    return response.json(appointment)
  }
}
