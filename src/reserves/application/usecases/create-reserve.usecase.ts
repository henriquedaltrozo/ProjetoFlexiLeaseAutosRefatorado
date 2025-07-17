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
    id_vehicle: string
    id_user: string
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
        !input.id_vehicle ||
        !input.id_user
      ) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      const startDate = new Date(input.start_date)
      const endDate = new Date(input.end_date)

      if (startDate >= endDate) {
        throw new BadRequestError('Start date must be before end date')
      }

      if (startDate < new Date()) {
        throw new BadRequestError('Start date cannot be in the past')
      }

      await this.usersRepository.findById(input.id_user)

      await this.vehiclesRepository.findById(input.id_vehicle)

      const conflictingReserve =
        await this.reservesRepository.findConflictingReserve(
          input.id_vehicle,
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
        id_vehicle: input.id_vehicle,
        id_user: input.id_user,
      })

      return this.reservesRepository.insert(reserve)
    }
  }
}
