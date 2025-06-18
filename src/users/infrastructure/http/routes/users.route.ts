import { Router } from 'express'
import { createUserController } from '../controllers/create-user.controller'
import { searchUserController } from '../controllers/search-user.controller'

const usersRouter = Router()

usersRouter.post('/', createUserController)
usersRouter.get('/', searchUserController)

export { usersRouter }
