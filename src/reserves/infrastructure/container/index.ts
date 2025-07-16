import { dataSource } from '@/common/infrastructure/typeorm'
import { ReservesTypeormRepository } from '@/reserves/infrastructure/typeorm/repositories/reserves-typeorm.repository'
import { container } from 'tsyringe'
import { Reserve } from '../typeorm/entities/reserves.entity'
import { CreateReserveUseCase } from '@/reserves/application/usecases/create-reserve.usecase'
import { SearchReserveUseCase } from '@/reserves/application/usecases/search-reserve.usecase'
import { UpdateReserveUseCase } from '@/reserves/application/usecases/update-reserve.usecase'
import { DeleteReserveUseCase } from '@/reserves/application/usecases/delete-reserve.usecase'
import { GetReserveUseCase } from '@/reserves/application/usecases/get-reserve.usecase'

container.registerSingleton('ReservesRepository', ReservesTypeormRepository)

container.registerInstance(
  'ReservesDefaultRepositoryTypeorm',
  dataSource.getRepository(Reserve),
)

container.registerSingleton(
  'CreateReserveUseCase',
  CreateReserveUseCase.UseCase,
)

container.registerSingleton(
  'SearchReserveUseCase',
  SearchReserveUseCase.UseCase,
)

container.registerSingleton(
  'UpdateReserveUseCase',
  UpdateReserveUseCase.UseCase,
)

container.registerSingleton(
  'DeleteReserveUseCase',
  DeleteReserveUseCase.UseCase,
)

container.registerSingleton('GetReserveUseCase', GetReserveUseCase.UseCase)
