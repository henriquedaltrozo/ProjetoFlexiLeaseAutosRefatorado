import { VehiclesRepository } from '@/vehicles/domain/repositories/vehicles.repository'
import { inject, injectable } from 'tsyringe'
import { VehicleOutput } from '../dtos/vehicle-output.dto'

export namespace GetVehicleUseCase {
  export type Input = {
    id: string
  }

  export type Output = VehicleOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('VehicleRepository')
      private vehiclesRepository: VehiclesRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const vehicle: VehicleOutput = await this.vehiclesRepository.findById(
        input.id,
      )

      return vehicle
    }
  }
}
