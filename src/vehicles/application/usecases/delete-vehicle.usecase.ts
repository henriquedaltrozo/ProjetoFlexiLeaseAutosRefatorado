import { VehiclesRepository } from '@/vehicles/domain/repositories/vehicles.repository'
import { inject, injectable } from 'tsyringe'

export namespace DeleteVehicleUseCase {
  export type Input = {
    id: string
  }

  export type Output = void

  @injectable()
  export class UseCase {
    constructor(
      @inject('VehicleRepository')
      private vehiclesRepository: VehiclesRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      await this.vehiclesRepository.delete(input.id)
    }
  }
}
