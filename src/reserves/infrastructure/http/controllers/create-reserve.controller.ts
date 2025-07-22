import { Request, Response } from 'express'
import { dataValidation } from '@/common/infrastructure/validation/zod'
import { CreateReserveUseCase } from '@/reserves/application/usecases/create-reserve.usecase'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function createReserveController(
  request: Request,
  response: Response,
): Promise<Response> {
  const bodySchema = z.object({
    start_date: z.string(),
    end_date: z.string(),
    vehicle_id: z.string().uuid(),
    user_id: z.string().uuid(),
  })

  const { start_date, end_date, vehicle_id, user_id } = dataValidation(
    bodySchema,
    request.body,
  )

  const createReserveUseCase: CreateReserveUseCase.UseCase = container.resolve(
    'CreateReserveUseCase',
  )

  const reserve = await createReserveUseCase.execute({
    start_date,
    end_date,
    vehicle_id,
    user_id,
  })

  return response.status(201).json(reserve)
}
