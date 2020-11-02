import { Router } from 'express'

import AppointmentsController from '../controllers/AppoitmentsController'

const appointmentsRouter = Router()

const appointmentsController = new AppointmentsController()

appointmentsRouter.post('/', appointmentsController.create)
appointmentsRouter.get('/', appointmentsController.index)

export default appointmentsRouter
