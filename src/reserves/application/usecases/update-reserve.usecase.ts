import { inject, injectable } from 'tsyringe'
import { ReserveOutput } from '../dtos/reserve-output.dto'
import { ReservesRepository } from '@/reserves/domain/repositories/reserves.repository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'
import { ConflictError } from '@/common/domain/errors/conflict-error'

export namespace UpdateReserveUseCase {
  export type Input = {
    id: string
    start_date?: string
    end_date?: string
    vehicle_id?: string
    user_id?: string
  }

  export type Output = ReserveOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('ReservesRepository')
      private reservesRepository: ReservesRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError('Id not provided')
      }

      const reserve = await this.reservesRepository.findById(input.id)

      const updateData: any = {}

      if (input.start_date) {
        updateData.start_date = new Date(input.start_date)
      }

      if (input.end_date) {
        updateData.end_date = new Date(input.end_date)
      }

      if (input.vehicle_id) {
        updateData.vehicle_id = input.vehicle_id
      }

      if (input.user_id) {
        updateData.user_id = input.user_id
      }

      const startDate = updateData.start_date || reserve.start_date
      const endDate = updateData.end_date || reserve.end_date

      if (startDate >= endDate) {
        throw new BadRequestError('Start date must be before end date')
      }

      if (
        updateData.start_date ||
        updateData.end_date ||
        updateData.vehicle_id
      ) {
        const vehicleId = updateData.vehicle_id || reserve.vehicle_id
        const conflictingReserve =
          await this.reservesRepository.findConflictingReserve(
            vehicleId,
            startDate,
            endDate,
          )

        if (conflictingReserve && conflictingReserve.id !== input.id) {
          throw new ConflictError(
            'Vehicle is already reserved for the selected period',
          )
        }
      }

      return await this.reservesRepository.update({
        id: input.id,
        ...updateData,
      })
    }
  }
}
