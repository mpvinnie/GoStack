import { Request, Response } from 'express'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const usersRepositry = new UsersRepository()
    const updateUserAvatar = new UpdateUserAvatarService(usersRepositry)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    return response.json(user)
  }
}

export default UserAvatarController
