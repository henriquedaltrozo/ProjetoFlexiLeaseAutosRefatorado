import { Router } from 'express'
import { createUserController } from '../controllers/create-user.controller'
import { searchUserController } from '../controllers/search-user.controller'
import { updateUserController } from '../controllers/update-user.controller'
import { deleteUserController } from '../controllers/delete-user.controller'
import { getUserController } from '../controllers/get-user.controller'
import { isAuthenticated } from '@/common/infrastructure/http/middlewares/isAuthenticated'

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: "pass1234"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User ID
 *                   example: "866da2c8-0e69-4089-9abf-0d4332751165"
 *                 name:
 *                   type: string
 *                   description: User name
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: User email
 *                   example: "john.doe@example.com"
 *                 password:
 *                   type: string
 *                   description: User password
 *                   example: "pass1234"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: User creation timestamp
 *                   example: "2025-07-21T00:59:26.002Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: User update timestamp
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
 *                   example: "email -> Invalid email"
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
 *                   example: "Email already in use"
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                       id:
 *                         type: string
 *                         description: User ID
 *                         example: "866da2c8-0e69-4089-9abf-0d4332751165"
 *                       name:
 *                         type: string
 *                         description: User name
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         format: email
 *                         description: User email
 *                         example: "john.doe@example.com"
 *                       password:
 *                         type: string
 *                         description: User password
 *                         example: "pass1234"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: User creation timestamp
 *                         example: "2025-07-21T00:59:26.002Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         description: User update timestamp
 *                         example: "2025-07-21T00:59:26.002Z"
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
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User ID
 *                   example: "866da2c8-0e69-4089-9abf-0d4332751165"
 *                 name:
 *                   type: string
 *                   description: User name
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: User email
 *                   example: "john.doe@example.com"
 *                 password:
 *                   type: string
 *                   description: User password
 *                   example: "pass1234"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: User creation timestamp
 *                   example: "2025-07-21T00:59:26.002Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: User update timestamp
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
 *                   example: "User not found with the provided ID"
 */

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User name
 *                 example: "John"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email
 *                 example: "john@test.com"
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: "password"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User ID
 *                   example: "866da2c8-0e69-4089-9abf-0d4332751165"
 *                 name:
 *                   type: string
 *                   description: User name
 *                   example: "John"
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: User email
 *                   example: "john@test.com"
 *                 password:
 *                   type: string
 *                   description: User password
 *                   example: "password"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: User creation timestamp
 *                   example: "2025-07-21T00:59:26.002Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: User update timestamp
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
 *                   example: "User not found with the provided ID"
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
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
 *                   example: "User not found with the provided ID"
 */

const usersRouter = Router()

usersRouter.post('/', createUserController)
usersRouter.use(isAuthenticated)
usersRouter.get('/', searchUserController)
usersRouter.get('/:id', getUserController)
usersRouter.put('/:id', updateUserController)
usersRouter.delete('/:id', deleteUserController)

export { usersRouter }
