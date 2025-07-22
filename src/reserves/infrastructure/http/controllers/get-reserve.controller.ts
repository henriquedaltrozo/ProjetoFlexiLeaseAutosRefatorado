import { Request, Response } from 'express'
import { dataValidation } from '@/common/infrastructure/validation/zod'
import { GetReserveUseCase } from '@/reserves/application/usecases/get-reserve.usecase'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function getReserveController(
  request: Request,
  response: Response,
): Promise<Response> {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = dataValidation(paramsSchema, request.params)

  const getReserveUseCase: GetReserveUseCase.UseCase =
    container.resolve('GetReserveUseCase')

  const reserve = await getReserveUseCase.execute({ id })

  return response.json(reserve)
}
