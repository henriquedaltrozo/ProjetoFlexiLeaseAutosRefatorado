import { dataSource } from '@/common/infrastructure/typeorm'
import { UsersTypeormRepository } from '@/users/infrastructure/typeorm/repositories/users-typeorm.repository'
import { container } from 'tsyringe'
import { User } from '../typeorm/entities/users.entity'
import { CreateUserUseCase } from '@/users/application/usecases/create-user.usecase'
import { SearchUserUseCase } from '@/users/application/usecases/search-user.usecase'
import { AuthenticateUserUseCase } from '@/users/application/usecases/authenticate-user.usecase'
import { UpdateUserUseCase } from '@/users/application/usecases/update-user.usecase'
import { DeleteUserUseCase } from '@/users/application/usecases/delete-user.usecase'
import { GetUserUseCase } from '@/users/application/usecases/get-user.usecase'

container.registerSingleton('UsersRepository', UsersTypeormRepository)

container.registerInstance(
  'UsersDefaultRepositoryTypeorm',
  dataSource.getRepository(User),
)

container.registerSingleton('CreateUserUseCase', CreateUserUseCase.UseCase)

container.registerSingleton('SearchUserUseCase', SearchUserUseCase.UseCase)

container.registerSingleton(
  'AuthenticateUserUseCase',
  AuthenticateUserUseCase.UseCase,
)

container.registerSingleton('UpdateUserUseCase', UpdateUserUseCase.UseCase)

container.registerSingleton('DeleteUserUseCase', DeleteUserUseCase.UseCase)

container.registerSingleton('GetUserUseCase', GetUserUseCase.UseCase)
