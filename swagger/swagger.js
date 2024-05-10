const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'BuzzMake API',
            version: '1.0.0',
            description: 'API documentation for BuzzMake Management System',
        },
        security: [{ bearerAuth: [] }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                },
            },
        },
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;