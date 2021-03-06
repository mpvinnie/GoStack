import { Router } from 'express'

import AppointmentsController from '../controllers/AppoitmentsController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

const appointmentsController = new AppointmentsController()

appointmentsRouter.post('/', appointmentsController.create)
appointmentsRouter.get('/', appointmentsController.index)

export default appointmentsRouter
