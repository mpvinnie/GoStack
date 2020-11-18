import { Request, Response } from 'express'

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    return response.json({ ok: true })
  }
}

export default UserAvatarController
