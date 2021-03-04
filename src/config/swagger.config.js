module.exports = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Nodejs-Starter-Template API',
            version: '1.0.0',
            description: 'The API documentation of a boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose.',
            license: {
                name: 'MIT',
                url: 'https://choosealicense.com/licenses/mit/',
            },
            contact: {
                name: 'Bahrican Yesil',
                url: 'https://github.com/bahricanyesil',
                email: 'bahricanyesil@gmail.com',
            },
        },
        basePath: '/api',
        servers: [
            {
                url: 'http://localhost:3000/api/',
            },
        ],
    },
    tags: [
        {
            "name": "User",
            "description": "API for users"
        }
    ],
    components: {
        "schemas": {
            "User": {
                "properties": {
                    "email": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "username": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string",
                        "enum": ["admin", "user", "reader", "creator"]
                    },
                    "language": {
                        "type": "string",
                        "enum": ["tr", "en"]
                    },
                    "isPremium": {
                        "type": "boolean"
                    },
                    "gender": {
                        "type": "string",
                        "enum": ["male", "female", "other"]
                    },
                    "countryCode": {
                        "type": "String"
                    },
                    "timezone": {
                        "type": "number"
                    },
                    "birthDate": {
                        "type": "String"
                    },
                    "photoUrl": {
                        "type": "String"
                    },
                    "isActivated": {
                        "type": "boolean"
                    },
                    "isVerified": {
                        "type": "boolean"
                    },
                    "deviceId": {
                        "type": "String"
                    },
                    "platform": {
                        "type": "string",
                        "enum": ["Android", "IOS"]
                    },
                    "deletedAt": {
                        "type": "String"
                    },
                }
            }
        }
    },
    apis: [
        "src/models/*.js",
        "src/utils/helpers/*.js",
        "src/api/controllers/user/*.js",
        "src/api/controllers/user/edit/*.js",
        "src/api/controllers/user/auth/*.js"
    ]
};