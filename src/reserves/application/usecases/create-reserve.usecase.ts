import { inject, injectable } from 'tsyringe'
import { ReserveOutput } from '../dtos/reserve-output.dto'
import { ReservesRepository } from '@/reserves/domain/repositories/reserves.repository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { ConflictError } from '@/common/domain/errors/conflict-error'
import { UsersRepository } from '@/users/domain/repositories/users.repository'
import { VehiclesRepository } from '@/vehicles/domain/repositories/vehicles.repository'

export namespace CreateReserveUseCase {
  export type Input = {
    start_date: string
    end_date: string
    vehicle_id: string
    user_id: string
  }

  export type Output = ReserveOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('ReservesRepository')
      private reservesRepository: ReservesRepository,
      @inject('UsersRepository')
      private usersRepository: UsersRepository,
      @inject('VehicleRepository')
      private vehiclesRepository: VehiclesRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      if (
        !input.start_date ||
        !input.end_date ||
        !input.vehicle_id ||
        !input.user_id
      ) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      const startDate = new Date(input.start_date)
      const endDate = new Date(input.end_date)

      if (startDate >= endDate) {
        throw new BadRequestError('Start date must be before end date')
      }

      await this.usersRepository.findById(input.user_id)

      await this.vehiclesRepository.findById(input.vehicle_id)

      const conflictingReserve =
        await this.reservesRepository.findConflictingReserve(
          input.vehicle_id,
          startDate,
          endDate,
        )

      if (conflictingReserve) {
        throw new ConflictError(
          'Vehicle is already reserved for the selected period',
        )
      }

      const reserve = this.reservesRepository.create({
        start_date: startDate,
        end_date: endDate,
        vehicle_id: input.vehicle_id,
        user_id: input.user_id,
      })

      return this.reservesRepository.insert(reserve)
    }
  }
}
