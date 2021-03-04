const express = require('express');
const router = express.Router();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');
const { specs, swaggerConfig } = require('../../config');

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, swaggerUiExpress.serve);
router.get(specs, swaggerUiExpress.setup(specDoc, { explorer: true }));

const user = require('./user');

router.use('/user', user);

module.exports = router;