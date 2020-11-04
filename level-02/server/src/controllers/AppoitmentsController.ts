import { Request, Response } from 'express'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import { getCustomRepository } from 'typeorm'

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointments = await appointmentsRepository.find()

    return response.json(appointments)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { provider, date } = request.body

      const parsedDate = parseISO(date)

      const createAppointment = new CreateAppointmentService()

      const appointment = await createAppointment.execute({
        date: parsedDate,
        provider
      })

      return response.json(appointment)
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }
}