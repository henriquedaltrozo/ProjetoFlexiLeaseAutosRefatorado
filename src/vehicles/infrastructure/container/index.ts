import { dataSource } from '@/common/infrastructure/typeorm'
import { CreateVehicleUseCase } from '@/vehicles/application/usecases/create-vehicle.usecase'
import { DeleteVehicleUseCase } from '@/vehicles/application/usecases/delete-vehicle.usecase'
import { GetVehicleUseCase } from '@/vehicles/application/usecases/get-vehicle.usecase'
import { UpdateVehicleUseCase } from '@/vehicles/application/usecases/update-vehicle.usecase'
import { Vehicle } from '@/vehicles/infrastructure/typeorm/entities/vehicles.entity'
import { VehiclesTypeOrmRepository } from '@/vehicles/infrastructure/typeorm/repositories/vehicles-typeorm.repository'
import { container } from 'tsyringe'

container.registerSingleton('VehicleRepository', VehiclesTypeOrmRepository)

container.registerSingleton(
  'CreateVehicleUseCase',
  CreateVehicleUseCase.UseCase,
)

container.registerInstance(
  'VehiclesDefaultTypeormRepository',
  dataSource.getRepository(Vehicle),
)

container.registerSingleton('GetVehicleUseCase', GetVehicleUseCase.UseCase)

container.registerSingleton(
  'UpdateVehicleUseCase',
  UpdateVehicleUseCase.UseCase,
)

container.registerSingleton(
  'DeleteVehicleUseCase',
  DeleteVehicleUseCase.UseCase,
)
