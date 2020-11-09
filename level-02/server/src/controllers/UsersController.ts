import { Request, Response } from 'express'

import CreateUserService from '../services/CreateUserService'

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body

      const createUser = new CreateUserService()

      const user = await createUser.execute({
        name,
        email,
        password
      })

      return response.json(user)

      return response.json({ ok: true })
    } catch (err) {
      return response.status(400).json({ message: err.message })
    }
  }
}
