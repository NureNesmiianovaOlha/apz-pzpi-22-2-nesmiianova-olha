const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student Performance API',
      version: '1.0.0',
      description: 'API для системи контролю успішності студентів',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
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
    },
  },
  apis: ['./routes/*.js'], // шляхи до файлів з роутами
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec; 