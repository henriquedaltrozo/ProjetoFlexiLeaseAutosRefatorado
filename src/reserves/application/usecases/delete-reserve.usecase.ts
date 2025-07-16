import { inject, injectable } from 'tsyringe'
import { ReservesRepository } from '@/reserves/domain/repositories/reserves.repository'
import { BadRequestError } from '@/common/domain/errors/bad-request-error'

export namespace DeleteReserveUseCase {
  export type Input = {
    id: string
  }

  export type Output = void

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

      await this.reservesRepository.findById(input.id)
      await this.reservesRepository.delete(input.id)
    }
  }
}
