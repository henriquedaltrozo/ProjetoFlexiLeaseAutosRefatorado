import { Router } from 'express'
import { vehiclesRouter } from '@/vehicles/infrastructure/http/routes/vehicles.route'
import { usersRouter } from '@/users/infrastructure/http/routes/users.route'
import { authRouter } from '@/users/infrastructure/http/routes/auth.route'

const routes = Router()

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Olá Dev!' })
})

routes.use('/vehicles', vehiclesRouter)
routes.use('/auth', authRouter)
routes.use('/users', usersRouter)

export { routes }
