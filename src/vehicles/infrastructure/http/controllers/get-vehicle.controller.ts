import { Request, Response } from 'express'
import { z } from 'zod'
import { container } from 'tsyringe'
import { GetVehicleUseCase } from '@/vehicles/application/usecases/get-vehicle.usecase'
import { dataValidation } from '@/common/infrastructure/validation/zod'

export async function getVehicleController(
  request: Request,
  response: Response,
) {
  const getVehicleParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = dataValidation(getVehicleParamSchema, request.params)

  const getVehicleUseCase: GetVehicleUseCase.UseCase =
    container.resolve('GetVehicleUseCase')

  const vehicle = await getVehicleUseCase.execute({ id })

  return response.status(200).json(vehicle)
}
