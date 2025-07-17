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
 *   description: Gerenciamento de reservas de veículos
 */

/**
 * @swagger
 * /reserves:
 *   post:
 *     summary: Criar uma nova reserva
 *     tags: [Reserves]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReserveInput'
 *     responses:
 *       201:
 *         description: Reserva criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserve'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token inválido ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Veículo não disponível no período solicitado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /reserves:
 *   get:
 *     summary: Listar reservas
 *     tags: [Reserves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: per_page
 *         schema:
 *           type: integer
 *           default: 15
 *         description: Itens por página
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Campo para ordenação
 *       - in: query
 *         name: sort_dir
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Direção da ordenação
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filtro de busca
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginationOutput'
 *       401:
 *         description: Token inválido ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /reserves/{id}:
 *   get:
 *     summary: Buscar reserva por ID
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
 *         description: ID da reserva
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserve'
 *       401:
 *         description: Token inválido ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Reserva não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /reserves/{id}:
 *   put:
 *     summary: Atualizar reserva
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
 *         description: ID da reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReserveInput'
 *     responses:
 *       200:
 *         description: Reserva atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reserve'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token inválido ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Reserva não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Veículo não disponível no período solicitado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /reserves/{id}:
 *   delete:
 *     summary: Deletar reserva
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
 *         description: ID da reserva
 *     responses:
 *       204:
 *         description: Reserva deletada com sucesso
 *       401:
 *         description: Token inválido ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Reserva não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

const reservesRouter = Router()

reservesRouter.use(isAuthenticated)
reservesRouter.post('/', createReserveController)
reservesRouter.get('/', searchReserveController)
reservesRouter.get('/:id', getReserveController)
reservesRouter.put('/:id', updateReserveController)
reservesRouter.delete('/:id', deleteReserveController)

export { reservesRouter }
