import { Request, Response } from 'express'

import AuthenticateUserService from '../services/AuthenticateUserService'

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body

      const authenticateUser = new AuthenticateUserService()

      const { user, token } = await authenticateUser.execute({
        email,
        password
      })

      return response.json({ user, token })
    } catch (err) {
      return response.status(401).json({ error: err.message })
    }
  }
}

export default SessionsController
