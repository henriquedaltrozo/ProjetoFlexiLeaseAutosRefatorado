import { Router } from 'express'
import { createReserveController } from '../controllers/create-reserve.controller'
import { searchReserveController } from '../controllers/search-reserve.controller'
import { updateReserveController } from '../controllers/update-reserve.controller'
import { deleteReserveController } from '../controllers/delete-reserve.controller'
import { getReserveController } from '../controllers/get-reserve.controller'
import { isAuthenticated } from '@/common/infrastructure/http/middlewares/isAuthenticated'

const reservesRouter = Router()

reservesRouter.use(isAuthenticated)
reservesRouter.post('/', createReserveController)
reservesRouter.get('/', searchReserveController)
reservesRouter.get('/:id', getReserveController)
reservesRouter.put('/:id', updateReserveController)
reservesRouter.delete('/:id', deleteReserveController)

export { reservesRouter }
