import { Router } from 'express'
import { createVehicleController } from '../controllers/create-vehicle.controller'
import { getVehicleController } from '../controllers/get-vehicle.controller'

const vehiclesRouter = Router()

vehiclesRouter.post('/', createVehicleController)
vehiclesRouter.get('/:id', getVehicleController)

export { vehiclesRouter }
