import { container } from 'tsyringe'

import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider'
import IHashProvider from './HashProvider/models/IHasProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
