import { Router } from 'express'
import { createUserController } from '../controllers/create-user.controller'
import { searchUserController } from '../controllers/search-user.controller'
import { isAuthenticated } from '@/common/infrastructure/http/middlewares/isAuthenticated'

const usersRouter = Router()

usersRouter.post('/', createUserController)
usersRouter.use(isAuthenticated)
usersRouter.get('/', searchUserController)

export { usersRouter }
