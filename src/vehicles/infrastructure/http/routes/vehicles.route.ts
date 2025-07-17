import { Router } from 'express'
import { createVehicleController } from '../controllers/create-vehicle.controller'
import { getVehicleController } from '../controllers/get-vehicle.controller'
import { updateVehicleController } from '../controllers/update-vehicle.controller'
import { deleteVehicleController } from '../controllers/delete-vehicle.controller'
import { searchVehicleController } from '../controllers/search-vehicle.controller'

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Gerenciamento de veículos
 */

/**
 * @swagger
 * /vehicles:
 *   post:
 *     summary: Criar um novo veículo
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleInput'
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /vehicles:
 *   get:
 *     summary: Listar veículos
 *     tags: [Vehicles]
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
 *         description: Lista de veículos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginationOutput'
 */

/**
 * @swagger
 * /vehicles/{id}:
 *   get:
 *     summary: Buscar veículo por ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do veículo
 *     responses:
 *       200:
 *         description: Veículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       404:
 *         description: Veículo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /vehicles/{id}:
 *   put:
 *     summary: Atualizar veículo
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do veículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleInput'
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vehicle'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Veículo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /vehicles/{id}:
 *   delete:
 *     summary: Deletar veículo
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do veículo
 *     responses:
 *       204:
 *         description: Veículo deletado com sucesso
 *       404:
 *         description: Veículo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

const vehiclesRouter = Router()

vehiclesRouter.post('/', createVehicleController)
vehiclesRouter.get('/:id', getVehicleController)
vehiclesRouter.put('/:id', updateVehicleController)
vehiclesRouter.delete('/:id', deleteVehicleController)
vehiclesRouter.get('/', searchVehicleController)

export { vehiclesRouter }
