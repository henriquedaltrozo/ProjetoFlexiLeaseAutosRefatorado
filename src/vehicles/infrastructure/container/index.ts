import { dataSource } from '@/common/infrastructure/typeorm'
import { CreateVehicleUseCase } from '@/vehicles/application/usecases/create-vehicle.usecase'
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
