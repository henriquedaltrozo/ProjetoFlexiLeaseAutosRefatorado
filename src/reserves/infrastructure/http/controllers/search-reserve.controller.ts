import { Request, Response } from 'express'
import { dataValidation } from '@/common/infrastructure/validation/zod'
import { SearchReserveUseCase } from '@/reserves/application/usecases/search-reserve.usecase'
import { container } from 'tsyringe'
import { z } from 'zod'

export async function searchReserveController(
  request: Request,
  response: Response,
): Promise<Response> {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    per_page: z.coerce.number().min(1).max(15).default(15),
    sort: z.string().optional(),
    sort_dir: z.enum(['asc', 'desc']).optional(),
    filter: z.string().optional(),
  })

  const { page, per_page, sort, sort_dir, filter } = dataValidation(
    querySchema,
    request.query,
  )

  const searchReserveUseCase: SearchReserveUseCase.UseCase = container.resolve(
    'SearchReserveUseCase',
  )

  const reserves = await searchReserveUseCase.execute({
    page,
    per_page,
    sort,
    sort_dir,
    filter,
  })

  return response.json(reserves)
}
