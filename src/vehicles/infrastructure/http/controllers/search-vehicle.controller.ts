import { dataValidation } from '@/common/infrastructure/validation/zod'
import { SearchVehicleUseCase } from '@/vehicles/application/usecases/search-vehicle.usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function searchVehicleController(
  request: Request,
  response: Response,
): Promise<Response> {
  const querySchema = z.object({
    page: z.coerce.number().optional(),
    per_page: z.coerce.number().optional(),
    sort: z.string().optional(),
    sort_dir: z.string().optional(),
    filter: z.string().optional(),
  })
  const { page, per_page, sort, sort_dir, filter } = dataValidation(
    querySchema,
    request.query,
  )

  const searchVehicleUseCase: SearchVehicleUseCase.UseCase = container.resolve(
    'SearchVehicleUseCase',
  )

  const vehicles = await searchVehicleUseCase.execute({
    page: page ?? 1,
    per_page: per_page ?? 15,
    sort: sort ?? null,
    sort_dir: sort_dir ?? null,
    filter: filter ?? null,
  })

  return response.status(200).json(vehicles)
}
