import { inject, injectable } from 'tsyringe'
import { ReserveOutput } from '../dtos/reserve-output.dto'
import { ReservesRepository } from '@/reserves/domain/repositories/reserves.repository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'

export namespace GetReserveUseCase {
  export type Input = {
    id: string
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

      return await this.reservesRepository.findById(input.id)
    }
  }
}
