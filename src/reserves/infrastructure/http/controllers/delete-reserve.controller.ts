import { Request, Response } from 'express'
import { dataValidation } from '@/common/infrastructure/validation/zod'
import { DeleteReserveUseCase } from '@/reserves/application/usecases/delete-reserve.usecase'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function deleteReserveController(
  request: Request,
  response: Response,
): Promise<Response> {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const { id } = dataValidation(paramsSchema, request.params)

  const deleteReserveUseCase: DeleteReserveUseCase.UseCase = container.resolve(
    'DeleteReserveUseCase',
  )

  await deleteReserveUseCase.execute({ id })

  return response.status(204).send()
}
