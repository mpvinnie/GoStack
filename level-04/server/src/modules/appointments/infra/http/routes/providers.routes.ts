import { Router } from 'express'

import ProvidersController from '../controllers/ProvidersController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const providersRouter = Router()

providersRouter.use(ensureAuthenticated)

const providersController = new ProvidersController()

providersRouter.get('/', providersController.index)

export default providersRouter
