import { container } from 'tsyringe'
import '@/vehicles/infrastructure/container'
import '@/users/infrastructure/container'
import { BcryptjsHashProvider } from '../providers/hash-provider/bcryptjs-hash.provider'

container.registerSingleton('HashProvider', BcryptjsHashProvider)
