import 'reflect-metadata'
import { NotFoundError } from '@/common/domain/errors/not-found-error'
import { DeleteVehicleUseCase } from './delete-vehicle.usecase'
import { VehiclesInMemoryRepository } from '@/vehicles/infrastructure/in-memory/repositories/vehicles-in-memory.repository'
import { VehiclesDataBuilder } from '@/vehicles/infrastructure/testing/helpers/vehicles-data-builder'

describe('DeleteVehicleUseCase Unit Tests', () => {
  let sut: DeleteVehicleUseCase.UseCase
  let repository: VehiclesInMemoryRepository

  beforeEach(() => {
    repository = new VehiclesInMemoryRepository()
    sut = new DeleteVehicleUseCase.UseCase(repository)
  })

  test('should throws error when vehicle not found', async () => {
    await expect(async () => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      NotFoundError,
    )
    await expect(async () => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError(`Model not found using ID fakeId`),
    )
  })

  test('should be able to delete a vehicle', async () => {
    const spyDelete = jest.spyOn(repository, 'delete')
    const vehicle = await repository.insert(VehiclesDataBuilder({}))
    expect(repository.items.length).toBe(1)

    await sut.execute({ id: vehicle.id })
    expect(spyDelete).toHaveBeenCalledTimes(1)
    expect(repository.items.length).toBe(0)
  })
})
