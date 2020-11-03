import { Request, Response } from 'express'
import { startOfHour, parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'

const appointmentsRepository = new AppointmentsRepository()

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider, date } = request.body

    const parsedDate = startOfHour(parseISO(date))

    const findAppointment = appointmentsRepository.findByDate(date)

    if (findAppointment) {
      return response
        .status(400)
        .json({ error: 'This appointment is already booked' })
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: parsedDate
    })

    return response.json(appointment)
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const appointments = appointmentsRepository.findAll()
    return response.json(appointments)
  }
}
