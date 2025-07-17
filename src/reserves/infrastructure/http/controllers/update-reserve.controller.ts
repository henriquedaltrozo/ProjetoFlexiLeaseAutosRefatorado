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
    id: z.string(),
  })

  const bodySchema = z.object({
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    id_vehicle: z.string().optional(),
    id_user: z.string().optional(),
  })

  const { id } = dataValidation(paramsSchema, request.params)
  const { start_date, end_date, id_vehicle, id_user } = dataValidation(
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
    id_vehicle,
    id_user,
  })

  return response.json(reserve)
}
