import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FlexiLease Autos API',
      version: '1.0.0',
      description: 'API for FlexiLease Autos vehicle rental system',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Development Server',
      },
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication',
      },
      {
        name: 'Users',
        description: 'User management',
      },
      {
        name: 'Vehicles',
        description: 'Vehicle management',
      },
      {
        name: 'Reserves',
        description: 'Vehicle reserve management',
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
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique user ID',
            },
            name: {
              type: 'string',
              description: 'User name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Update date',
            },
          },
        },
        Vehicle: {
          type: 'object',
          required: [
            'name',
            'color',
            'year',
            'value_per_day',
            'number_of_passengers',
          ],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique vehicle ID',
            },
            name: {
              type: 'string',
              description: 'Vehicle name/model',
            },
            color: {
              type: 'string',
              description: 'Vehicle color',
            },
            year: {
              type: 'integer',
              description: 'Vehicle year',
            },
            value_per_day: {
              type: 'number',
              format: 'float',
              description: 'Daily rental value',
            },
            number_of_passengers: {
              type: 'integer',
              description: 'Number of passengers',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Update date',
            },
          },
        },
        Reserve: {
          type: 'object',
          required: ['start_date', 'end_date', 'vehicle_id', 'user_id'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique reserve ID',
            },
            start_date: {
              type: 'string',
              format: 'date-time',
              description: 'Reserve start date',
            },
            end_date: {
              type: 'string',
              format: 'date-time',
              description: 'Reserve end date',
            },
            vehicle_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the reserved vehicle',
            },
            user_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID of the user who made the reserve',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation date',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Update date',
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
