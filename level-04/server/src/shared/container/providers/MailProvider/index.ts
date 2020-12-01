import { container } from 'tsyringe'

import mailConfig from '@config/mail'

import mailProviders from '../MailProvider'

import IMailProvider from './models/IMailProvider'

import EtherealMailProvider from './implementations/EtherealMailProvider'
import SESMailProvider from './implementations/SESMailProvider'

export default {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider)
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProviders[mailConfig.driver]
)
