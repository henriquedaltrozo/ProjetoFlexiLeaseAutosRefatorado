import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FlexiLease Autos API',
      version: '1.0.0',
      description: 'API para sistema de locação de veículos FlexiLease Autos',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do usuário',
            },
            name: {
              type: 'string',
              description: 'Nome do usuário',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
            },
          },
        },
        UserInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              description: 'Nome do usuário',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Senha do usuário',
            },
          },
        },
        UserUpdate: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Nome do usuário',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Senha do usuário',
            },
          },
        },
        Vehicle: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do veículo',
            },
            name: {
              type: 'string',
              description: 'Nome/modelo do veículo',
            },
            color: {
              type: 'string',
              description: 'Cor do veículo',
            },
            year: {
              type: 'integer',
              description: 'Ano do veículo',
            },
            value_per_day: {
              type: 'number',
              format: 'float',
              description: 'Valor por dia de locação',
            },
            number_of_passengers: {
              type: 'integer',
              description: 'Número de passageiros',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
            },
          },
        },
        VehicleInput: {
          type: 'object',
          required: [
            'name',
            'color',
            'year',
            'value_per_day',
            'number_of_passengers',
          ],
          properties: {
            name: {
              type: 'string',
              description: 'Nome/modelo do veículo',
            },
            color: {
              type: 'string',
              description: 'Cor do veículo',
            },
            year: {
              type: 'integer',
              description: 'Ano do veículo',
            },
            value_per_day: {
              type: 'number',
              format: 'float',
              description: 'Valor por dia de locação',
            },
            number_of_passengers: {
              type: 'integer',
              description: 'Número de passageiros',
            },
          },
        },
        Reserve: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único da reserva',
            },
            start_date: {
              type: 'string',
              format: 'date-time',
              description: 'Data de início da reserva',
            },
            end_date: {
              type: 'string',
              format: 'date-time',
              description: 'Data de fim da reserva',
            },
            id_car: {
              type: 'string',
              format: 'uuid',
              description: 'ID do veículo reservado',
            },
            id_user: {
              type: 'string',
              format: 'uuid',
              description: 'ID do usuário que fez a reserva',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de atualização',
            },
          },
        },
        ReserveInput: {
          type: 'object',
          required: ['start_date', 'end_date', 'id_car'],
          properties: {
            start_date: {
              type: 'string',
              format: 'date-time',
              description: 'Data de início da reserva',
            },
            end_date: {
              type: 'string',
              format: 'date-time',
              description: 'Data de fim da reserva',
            },
            id_car: {
              type: 'string',
              format: 'uuid',
              description: 'ID do veículo a ser reservado',
            },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
            },
            password: {
              type: 'string',
              description: 'Senha do usuário',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token JWT para autenticação',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        PaginationOutput: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                type: 'object',
              },
            },
            meta: {
              type: 'object',
              properties: {
                current_page: {
                  type: 'integer',
                },
                per_page: {
                  type: 'integer',
                },
                last_page: {
                  type: 'integer',
                },
                total: {
                  type: 'integer',
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro',
            },
            code: {
              type: 'string',
              description: 'Código do erro',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    './src/**/*.route.ts',
    './src/**/routes/*.ts',
    './src/**/controllers/*.ts',
  ],
}

export const swaggerSpec = swaggerJSDoc(options)
