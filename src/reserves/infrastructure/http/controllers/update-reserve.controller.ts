import { Request, Response } from 'express'
import { dataValidation } from '@/common/infrastructure/validation/zod'
import { UpdateReserveUseCase } from '@/reserves/application/usecases/update-reserve.usecase'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function updateReserveController(
  request: Request,
  response: Response,
): Promise<Response> {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const bodySchema = z.object({
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    vehicle_id: z.string().uuid().optional(),
    user_id: z.string().uuid().optional(),
  })

  const { id } = dataValidation(paramsSchema, request.params)
  const { start_date, end_date, vehicle_id, user_id } = dataValidation(
    bodySchema,
    request.body,
  )

  const updateReserveUseCase: UpdateReserveUseCase.UseCase = container.resolve(
    'UpdateReserveUseCase',
  )

  const reserve = await updateReserveUseCase.execute({
    id,
    start_date,
    end_date,
    vehicle_id,
    user_id,
  })

  return response.json(reserve)
}
