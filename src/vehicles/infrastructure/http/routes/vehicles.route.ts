import { Router } from 'express'
import { createVehicleController } from '../controllers/create-vehicle.controller'
import { getVehicleController } from '../controllers/get-vehicle.controller'
import { updateVehicleController } from '../controllers/update-vehicle.controller'
import { deleteVehicleController } from '../controllers/delete-vehicle.controller'
import { searchVehicleController } from '../controllers/search-vehicle.controller'
import { isAuthenticated } from '@/common/infrastructure/http/middlewares/isAuthenticated'

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Vehicle management
 */

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - color
 *               - year
 *               - value_per_day
 *               - number_of_passengers
 *             properties:
 *               name:
 *                 type: string
 *                 description: Vehicle name
 *                 example: "Toyota Corolla"
 *               color:
 *                 type: string
 *                 description: Vehicle color
 *                 example: "Blue"
 *               year:
 *                 type: integer
 *                 description: Vehicle year
 *                 example: 2020
 *               value_per_day:
 *                 type: number
 *                 format: float
 *                 description: Daily rental value
 *                 example: 100
 *               number_of_passengers:
 *                 type: integer
 *                 description: Number of passengers
 *                 example: 5
 *     responses:
 *       201:
 *         description: Vehicle created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Vehicle ID
 *                   example: "4855d1a0-c790-4c36-86f2-39c6ca5aa94e"
 *                 name:
 *                   type: string
 *                   description: Vehicle name
 *                   example: "Toyota Corolla"
 *                 color:
 *                   type: string
 *                   description: Vehicle color
 *                   example: "Blue"
 *                 year:
 *                   type: integer
 *                   description: Vehicle year
 *                   example: 2020
 *                 value_per_day:
 *                   type: number
 *                   description: Vehicle daily rental value
 *                   example: 100
 *                 number_of_passengers:
 *                   type: number
 *                   description: Number of passengers
 *                   example: 5
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Vehicle creation timestamp
 *                   example: "2025-07-21T00:59:26.002Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: Vehicle update timestamp
 *                   example: "2025-07-21T00:59:26.002Z"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Token is missing"
 */

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: List vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: List of vehicles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Vehicle ID
 *                     example: "4855d1a0-c790-4c36-86f2-39c6ca5aa94e"
 *                   name:
 *                     type: string
 *                     description: Vehicle name
 *                     example: "Toyota Corolla"
 *                   color:
 *                     type: string
 *                     description: Vehicle color
 *                     example: "Blue"
 *                   year:
 *                     type: integer
 *                     description: Vehicle year
 *                     example: 2020
 *                   value_per_day:
 *                     type: number
 *                     description: Vehicle daily rental value
 *                     example: 100
 *                   number_of_passengers:
 *                     type: number
 *                     description: Number of passengers
 *                     example: 5
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Vehicle creation timestamp
 *                     example: "2025-07-21T00:59:26.002Z"
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     description: Vehicle update timestamp
 *                     example: "2025-07-21T00:59:26.002Z"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Token is missing"
 */

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Get vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Vehicle ID
 *     responses:
 *       200:
 *         description: Vehicle found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Vehicle ID
 *                   example: "4855d1a0-c790-4c36-86f2-39c6ca5aa94e"
 *                 name:
 *                   type: string
 *                   description: Vehicle name
 *                   example: "Toyota Corolla"
 *                 color:
 *                   type: string
 *                   description: Vehicle color
 *                   example: "Blue"
 *                 year:
 *                   type: integer
 *                   description: Vehicle year
 *                   example: 2020
 *                 value_per_day:
 *                   type: number
 *                   description: Vehicle daily rental value
 *                   example: 100
 *                 number_of_passengers:
 *                   type: number
 *                   description: Number of passengers
 *                   example: 5
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Vehicle creation timestamp
 *                   example: "2025-07-21T00:59:26.002Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: Vehicle update timestamp
 *                   example: "2025-07-21T00:59:26.002Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "id -> Invalid uuid"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Token is missing"
 */

/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Update vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Vehicle ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - color
 *               - year
 *               - value_per_day
 *               - number_of_passengers
 *             properties:
 *               name:
 *                 type: string
 *                 description: Vehicle name
 *                 example: Honda Civic
 *               color:
 *                 type: string
 *                 description: Vehicle color
 *                 example: Red
 *               year:
 *                 type: integer
 *                 description: Vehicle year
 *                 example: 2022
 *               value_per_day:
 *                 type: number
 *                 format: float
 *                 description: Daily rental value
 *                 example: 200
 *               number_of_passengers:
 *                 type: integer
 *                 description: Number of passengers
 *                 example: 5
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Vehicle ID
 *                   example: "4855d1a0-c790-4c36-86f2-39c6ca5aa94e"
 *                 name:
 *                   type: string
 *                   description: Vehicle name
 *                   example: "Honda Civic"
 *                 color:
 *                   type: string
 *                   description: Vehicle color
 *                   example: "Red"
 *                 year:
 *                   type: integer
 *                   description: Vehicle year
 *                   example: 2022
 *                 value_per_day:
 *                   type: number
 *                   description: Vehicle daily rental value
 *                   example: 200
 *                 number_of_passengers:
 *                   type: number
 *                   description: Number of passengers
 *                   example: 5
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Vehicle creation timestamp
 *                   example: "2025-07-21T00:59:26.002Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: Vehicle update timestamp
 *                   example: "2025-07-21T00:59:26.002Z"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "id -> Invalid uuid"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Token is missing"
 */

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Delete vehicle
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Vehicle ID
 *     responses:
 *       204:
 *         description: Vehicle deleted successfully
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "id -> Invalid uuid"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Token is missing"
 */

const vehiclesRouter = Router()

vehiclesRouter.use(isAuthenticated)
vehiclesRouter.post('/', createVehicleController)
vehiclesRouter.get('/:id', getVehicleController)
vehiclesRouter.put('/:id', updateVehicleController)
vehiclesRouter.delete('/:id', deleteVehicleController)
vehiclesRouter.get('/', searchVehicleController)

export { vehiclesRouter }
