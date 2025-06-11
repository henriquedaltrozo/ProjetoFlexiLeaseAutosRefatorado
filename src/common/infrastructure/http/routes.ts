import { vehiclesRouter } from '@/vehicles/infrastructure/http/routes/vehicles.route'
import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  return res.status(200).json({ message: 'Olá Dev!' })
})

routes.use('/vehicles', vehiclesRouter)

export { routes }
