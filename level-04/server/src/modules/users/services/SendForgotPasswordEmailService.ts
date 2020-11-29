import { inject, injectable } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/AppError'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepositry')
    private userTokensRepository: IUserTokensRepository
  ) {
    /* Empty */
  }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists')
    }

    await this.userTokensRepository.generate(user.id)

    this.mailProvider.sendMail(email, 'Pedido de email de recuperação recebido')
  }
}

export default SendForgotPasswordEmailService
