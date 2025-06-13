import { Request, Response } from 'express'
import { z } from 'zod'
import { container } from 'tsyringe'
import { dataValidation } from '@/common/infrastructure/validation/zod'
import { DeleteVehicleUseCase } from '@/vehicles/application/usecases/delete-vehicle.usecase'

export async function deleteVehicleController(
  request: Request,
  response: Response,
) {
  const deleteVehicleParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = dataValidation(deleteVehicleParamSchema, request.params)

  const deleteVehicleUseCase: DeleteVehicleUseCase.UseCase = container.resolve(
    'DeleteVehicleUseCase',
  )

  await deleteVehicleUseCase.execute({ id })

  return response.status(204).send()
}
