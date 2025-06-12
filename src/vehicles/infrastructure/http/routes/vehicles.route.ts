import { Router } from 'express'
import { createVehicleController } from '../controllers/create-vehicle.controller'
import { getVehicleController } from '../controllers/get-vehicle.controller'
import { updateVehicleController } from '../controllers/update-vehicle.controller'
import { deleteVehicleController } from '../controllers/delete-vehicle.controller'

const vehiclesRouter = Router()

vehiclesRouter.post('/', createVehicleController)
vehiclesRouter.get('/:id', getVehicleController)
vehiclesRouter.put('/:id', updateVehicleController)
vehiclesRouter.delete('/:id', deleteVehicleController)

export { vehiclesRouter }
