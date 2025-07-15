import { Router } from 'express'
import { createUserController } from '../controllers/create-user.controller'
import { searchUserController } from '../controllers/search-user.controller'
import { updateUserController } from '../controllers/update-user.controller'
import { deleteUserController } from '../controllers/delete-user.controller'
import { getUserController } from '../controllers/get-user.controller'
import { isAuthenticated } from '@/common/infrastructure/http/middlewares/isAuthenticated'

const usersRouter = Router()

usersRouter.post('/', createUserController)
usersRouter.use(isAuthenticated)
usersRouter.get('/', searchUserController)
usersRouter.get('/:id', getUserController)
usersRouter.put('/:id', updateUserController)
usersRouter.delete('/:id', deleteUserController)

export { usersRouter }
