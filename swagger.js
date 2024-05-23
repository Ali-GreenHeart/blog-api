import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'BLOG API with Terlan/Renat',
        description: 'We have created this project!'
    },
    host: 'localhost:4587',
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header', // can be 'header', 'query' or 'cookie'
            name: 'X-API-KEY', // name of the header, query parameter or cookie
            description: 'Some description...'
        }
    }
};

const outputFile = './swagger-output.json';
const routes = ["./routers/index.js"];

swaggerAutogen()(outputFile, routes, doc);
