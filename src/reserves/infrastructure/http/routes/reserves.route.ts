import { Router } from 'express'
import { createReserveController } from '../controllers/create-reserve.controller'
import { searchReserveController } from '../controllers/search-reserve.controller'
import { updateReserveController } from '../controllers/update-reserve.controller'
import { deleteReserveController } from '../controllers/delete-reserve.controller'
import { getReserveController } from '../controllers/get-reserve.controller'
import { isAuthenticated } from '@/common/infrastructure/http/middlewares/isAuthenticated'

/**
 * @swagger
 * tags:
 *   name: Reserves
 *   description: Vehicle reserve management
 */

/**
 * @swagger
 * /reserves:
 *   post:
 *     summary: Create a new reserve
 *     tags: [Reserves]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - start_date
 *               - end_date
 *               - vehicle_id
 *               - user_id
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: Reserve start date
 *                 example: "2025-07-25T10:00:00.000Z"
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: Reserve end date
 *                 example: "2025-07-30T18:00:00.000Z"
 *               vehicle_id:
 *                 type: string
 *                 format: uuid
 *                 description: Vehicle ID
 *                 example: "4855d1a0-c790-4c36-86f2-39c6ca5aa94e"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: User ID
 *                 example: "866da2c8-0e69-4089-9abf-0d4332751165"
 *     responses:
 *       201:
 *         description: Reserve created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   description: Reserve ID
 *                   example: "abc12345-6789-0def-1234-567890abcdef"
 *                 start_date:
 *                   type: string
 *                   format: date-time
 *                   description: Reserve start date
 *                   example: "2025-07-25T10:00:00.000Z"
 *                 end_date:
 *                   type: string
 *                   format: date-time
 *                   description: Reserve end date
 *                   example: "2025-07-30T18:00:00.000Z"
 *                 vehicle_id:
 *                   type: string
 *                   format: uuid
 *                   description: Vehicle ID
 *                   example: "4855d1a0-c790-4c36-86f2-39c6ca5aa94e"
 *                 user_id:
 *                   type: string
 *                   format: uuid
 *                   description: User ID
 *                   example: "866da2c8-0e69-4089-9abf-0d4332751165"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Reserve creation timestamp
 *                   example: "2025-07-21T00:59:26.002Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: Reserve update timestamp
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
 *       409:
 *         description: Conflict
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
 *                   example: "Vehicle is already reserved for the selected period"
 */

/**
 * @swagger
 * /reserves:
 *   get:
 *     summary: List reserves
 *     tags: [Reserves]
 *     responses:
 *       200:
 *         description: List of reserves
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     description: Reserve ID
 *                     example: "abc12345-6789-0def-1234-567890abcdef"
 *                   start_date:
 *                     type: string
 *                     format: date-time
 *                     description: Reserve start date
 *                     example: "2025-07-25T10:00:00.000Z"
 *                   end_date:
 *                     type: string
 *                     format: date-time
 *                     description: Reserve end date
 *                     example: "2025-07-30T18:00:00.000Z"
 *                   vehicle_id:
 *                     type: string
 *                     format: uuid
 *                     description: Vehicle ID
 *                     example: "4855d1a0-c790-4c36-86f2-39c6ca5aa94e"
 *                   user_id:
 *                     type: string
 *                     format: uuid
 *                     description: User ID
 *                     example: "866da2c8-0e69-4089-9abf-0d4332751165"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: Reserve creation timestamp
 *                     example: "2025-07-21T00:59:26.002Z"
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     description: Reserve update timestamp
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
 * /reserves/{id}:
 *   get:
 *     summary: Get reserve by ID
 *     tags: [Reserves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Reserve ID
 *     responses:
 *       200:
 *         description: Reserve found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   description: Reserve ID
 *                   example: "abc12345-6789-0def-1234-567890abcdef"
 *                 start_date:
 *                   type: string
 *                   format: date-time
 *                   description: Reserve start date
 *                   example: "2025-07-25T10:00:00.000Z"
 *                 end_date:
 *                   type: string
 *                   format: date-time
 *                   description: Reserve end date
 *                   example: "2025-07-30T18:00:00.000Z"
 *                 vehicle_id:
 *                   type: string
 *                   format: uuid
 *                   description: Vehicle ID
 *                   example: "4855d1a0-c790-4c36-86f2-39c6ca5aa94e"
 *                 user_id:
 *                   type: string
 *                   format: uuid
 *                   description: User ID
 *                   example: "866da2c8-0e69-4089-9abf-0d4332751165"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Reserve creation timestamp
 *                   example: "2025-07-21T00:59:26.002Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: Reserve update timestamp
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
 *       404:
 *         description: Not Found
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
 *                   example: "Reserve not found with the provided ID"
 */

/**
 * @swagger
 * /reserves/{id}:
 *   put:
 *     summary: Update reserve
 *     tags: [Reserves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Reserve ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date-time
 *                 description: Reserve start date
 *                 example: "2025-07-26T10:00:00.000Z"
 *               end_date:
 *                 type: string
 *                 format: date-time
 *                 description: Reserve end date
 *                 example: "2025-07-31T18:00:00.000Z"
 *               vehicle_id:
 *                 type: string
 *                 format: uuid
 *                 description: Vehicle ID
 *                 example: "4855d1a0-c790-4c36-86f2-39c6ca5aa94e"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: User ID
 *                 example: "866da2c8-0e69-4089-9abf-0d4332751165"
 *     responses:
 *       200:
 *         description: Reserve updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   description: Reserve ID
 *                   example: "abc12345-6789-0def-1234-567890abcdef"
 *                 start_date:
 *                   type: string
 *                   format: date-time
 *                   description: Reserve start date
 *                   example: "2025-07-26T10:00:00.000Z"
 *                 end_date:
 *                   type: string
 *                   format: date-time
 *                   description: Reserve end date
 *                   example: "2025-07-31T18:00:00.000Z"
 *                 vehicle_id:
 *                   type: string
 *                   format: uuid
 *                   description: Vehicle ID
 *                   example: "4855d1a0-c790-4c36-86f2-39c6ca5aa94e"
 *                 user_id:
 *                   type: string
 *                   format: uuid
 *                   description: User ID
 *                   example: "866da2c8-0e69-4089-9abf-0d4332751165"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Reserve creation timestamp
 *                   example: "2025-07-21T00:59:26.002Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: Reserve update timestamp
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
 *       404:
 *         description: Not Found
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
 *                   example: "Reserve not found with the provided ID"
 */

/**
 * @swagger
 * /reserves/{id}:
 *   delete:
 *     summary: Delete reserve
 *     tags: [Reserves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Reserve ID
 *     responses:
 *       204:
 *         description: Reserve deleted successfully
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
 *       404:
 *         description: Not Found
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
 *                   example: "Reserve not found with the provided ID"
 */

const reservesRouter = Router()

reservesRouter.use(isAuthenticated)
reservesRouter.post('/', createReserveController)
reservesRouter.get('/', searchReserveController)
reservesRouter.get('/:id', getReserveController)
reservesRouter.put('/:id', updateReserveController)
reservesRouter.delete('/:id', deleteReserveController)

export { reservesRouter }
