import { Request, Response } from 'express'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRepository = new AppointmentsRepository()

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { provider, date } = request.body

      const parsedDate = parseISO(date)

      const createAppointment = new CreateAppointmentService(
        appointmentsRepository
      )

      const appointment = createAppointment.execute({
        date: parsedDate,
        provider
      })

      return response.json(appointment)
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const appointments = appointmentsRepository.findAll()
    return response.json(appointments)
  }
}
