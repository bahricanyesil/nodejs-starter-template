const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
const api = require('./../config');
const routes = require('./../api/routes');
const { logger } = require('../utils');
const { rateLimiter } = require('../api/middlewares');
const { jwtSecretKey } = require('../config');

module.exports = async (app) => {
    process.on('uncaughtException', async (error) => {
        await logger('00001', '', error.message, 'Uncaught Exception', '');
        process.exit(1);
    });

    process.on('unhandledRejection', async (ex) => {
        await logger('00002', '', ex.message, 'Unhandled Rejection', '');
        process.exit(1);
    });

    if (!jwtSecretKey) {
        logger('00003', '', 'Jwtprivatekey is not defined', 'Process-Env', '');
        process.exit(1);
    }

    app.enable('trust proxy');
    app.use(cors());
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static('public'));
    app.disable('x-powered-by');
    app.disable('etag');

    app.use(rateLimiter);
    app.use(api.prefix, routes);

    app.get('/', (_req, res) => {
        return res.status(200).json({
            resultMessage: {
                en: 'Project is successfully working...',
                tr: 'Proje başarılı bir şekilde çalışıyor...'
            },
            resultCode: '00004'
        }).end();
    });

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Content-Security-Policy-Report-Only', 'default-src: https:');
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT POST PATCH DELETE GET');
            return res.status(200).json({});
        }
        next();
    });

    app.use((_req, _res, next) => {
        const error = new Error('Endpoint could not find!');
        error.status = 404;
        next(error);
    });

    app.use((error, req, res, _next) => {
        res.status(error.status || 500);
        let resultCode = '00015';
        let level = 'External Error';
        if (error.status === 500) {
            resultCode = '00013';
            level = 'Server Error';
        } else if (error.status === 404) {
            resultCode = '00014';
            level = 'Client Error';
        }
        logger(resultCode, req?.user?._id ?? '', error.message, level, req);
        return res.json({
            resultMessage: {
                en: error.message,
                tr: error.message
            },
            resultCode: resultCode,
        });

    });
}