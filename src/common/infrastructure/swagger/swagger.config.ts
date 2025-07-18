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
    tags: [
      {
        name: 'Authentication',
        description: 'Autenticação de usuários',
      },
      {
        name: 'Users',
        description: 'Gerenciamento de usuários',
      },
      {
        name: 'Vehicles',
        description: 'Gerenciamento de veículos',
      },
      {
        name: 'Reserves',
        description: 'Gerenciamento de reservas de veículos',
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
        UserOutput: {
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
        VehicleOutput: {
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
        ReserveInput: {
          type: 'object',
          required: ['start_date', 'end_date', 'vehicle_id', 'user_id'],
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
            vehicle_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID do veículo a ser reservado',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID do usuário que fez a reserva',
            },
          },
        },
        ReserveOutput: {
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
            vehicle_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID do veículo reservado',
            },
            user_id: {
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
        LoginOutput: {
          type: 'object',
          properties: {
            access_token: {
              type: 'string',
              description: 'Token JWT para autenticação',
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
