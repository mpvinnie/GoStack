import { getRepository } from 'typeorm'
import User from '../models/User'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      throw new Error('Incorrect email/password combination')
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination')
    }

    const token = sign({}, '79b40cad53cf2c97267b1d9909be8ce4', {
      subject: user.id,
      expiresIn: '1d'
    })

    return { user, token }
  }
}

export default AuthenticateUserService
