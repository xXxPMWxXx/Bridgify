const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output_autogen.json'
const endpointsFiles = ['./services/elderly/routes.ts']

swaggerAutogen(outputFile, endpointsFiles)