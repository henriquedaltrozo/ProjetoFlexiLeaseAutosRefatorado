import { Router } from 'express'
import { createVehicleController } from '../controllers/create-vehicle.controller'

const vehiclesRouter = Router()

vehiclesRouter.post('/', createVehicleController)

export { vehiclesRouter }
