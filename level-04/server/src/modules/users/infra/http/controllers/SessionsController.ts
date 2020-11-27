import { Request, Response } from 'express'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const usersRepositry = new UsersRepository()
    const authenticateUser = new AuthenticateUserService(usersRepositry)

    const { user, token } = await authenticateUser.execute({
      email,
      password
    })

    return response.json({ user, token })
  }
}

export default SessionsController
