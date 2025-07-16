import { Router } from 'express'
import { vehiclesRouter } from '@/vehicles/infrastructure/http/routes/vehicles.route'
import { usersRouter } from '@/users/infrastructure/http/routes/users.route'
import { authRouter } from '@/users/infrastructure/http/routes/auth.route'
import { reservesRouter } from '@/reserves/infrastructure/http/routes/reserves.route'

const routes = Router()

routes.use('/vehicles', vehiclesRouter)
routes.use('/auth', authRouter)
routes.use('/users', usersRouter)
routes.use('/reserves', reservesRouter)

export { routes }
