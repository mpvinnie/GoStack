import { Router } from 'express'

import AppointmentsController from '../controllers/AppoitmentsController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

const appointmentsController = new AppointmentsController()

appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter
