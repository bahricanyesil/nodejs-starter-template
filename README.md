# nodejs-starter-template
You can use this template when you're starting a new project. It contains general concepts, you can customize it according to your needs.

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose.

You will get a production-ready Node.js app installed and configured on your machine. The app comes with many built-in features, such as authentication using JWT, request validation, error handling, logging, API documentation, image uploading (to AWS bucket), email sending, etc.

Social logins (Google&Apple), unit and integration tests, in-app purchases (Google&Apple), daily crons, notifications (firebase), pagination, etc could be added in the future. Get ready for more, star it and wait!

<br />

## Manual Installation

- git clone https://github.com/bahricanyesil/nodejs-starter-template.git
- cd nodejs-starter-template
- npm install
- Prepare the environment variables by generating .env file just as .env.sample file
- npm start

<br />

## Table of Contents

<!-- TABLE-OF-CONTENTS:START -->
- [Features](https://github.com/bahricanyesil/nodejs-starter-template#features)
- [Environment Variables](https://github.com/bahricanyesil/nodejs-starter-template#environment-variables)
- [Project Structure](https://github.com/bahricanyesil/nodejs-starter-template#project-structure)
- [API Documentation](https://github.com/bahricanyesil/nodejs-starter-template#api-documentation)
- [Error Handling](https://github.com/bahricanyesil/nodejs-starter-template#error-handling)
- [Validation](https://github.com/bahricanyesil/nodejs-starter-template#validation)
- [Authentication](https://github.com/bahricanyesil/nodejs-starter-template#authentication)
- [Authorization](https://github.com/bahricanyesil/nodejs-starter-template#authorization)
- [Logging](https://github.com/bahricanyesil/nodejs-starter-template#logging)
- [Contributing](https://github.com/bahricanyesil/nodejs-starter-template#contributing)
<!-- TABLE-OF-CONTENTS:END -->

<br />

## [Features](#features)

<!-- FEATURES:START -->
- **NoSQL database**: [MongoDB](https://www.mongodb.com/) object data modeling using [Mongoose](https://mongoosejs.com/)
- **Authentication and authorization**: using [JWT](https://jwt.io/) (access and refresh token)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using a log model and storing in the db
- **Error handling**: error handling mechanism with specific result messages and codes
- **Image Uploading**: using [AWS S3 bucket](https://aws.amazon.com/tr/s3/)
- **Email Sending**: for now for verification code by using [nodemailer](https://nodemailer.com/about/) and [AWS SES](https://aws.amazon.com/tr/ses/)
- **Multilanguage Support**: using a util and jsons
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io/)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
<!-- FEATURES:END -->

<br />

## [Environment Variables](#environment-variables)

The environment variables should be set in a '.env' file just as .env.sample file. You should set the values of these keys:

```js
# URL of the Mongo DB
DB_URI=DB_URI_HERE

# JWT
# JWT secret key for access token
JWT_SECRET_KEY=JWT_SECRET_KEY_HERE
# JWT secret key for refresh token
REFRESH_TOKEN_SECRET_KEY=REFRESH_TOKEN_SECRET_KEY_HERE

# AWS configurations for S3 and SES services
AWS_REGION=AWS_REGION_HERE
AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID_HERE
AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY_HERE
```

<br />

## [Project Structure](#project-structure)

```js
├─ src
│  ├─ api
│  │  ├─ controllers
│  │  │  └─ user
│  │  │     ├─ auth
│  │  │     │  ├─ forgot-password.js
│  │  │     │  ├─ login.js
│  │  │     │  ├─ logout.js
│  │  │     │  ├─ refresh-token.js
│  │  │     │  ├─ register.js
│  │  │     │  ├─ send-verification-code.js
│  │  │     │  └─ verify-email.js
│  │  │     ├─ edit
│  │  │     │  ├─ change-password.js
│  │  │     │  └─ edit-user.js
│  │  │     ├─ delete-user.js
│  │  │     ├─ get-user.js
│  │  │     └─ index.js
│  │  ├─ middlewares
│  │  │  ├─ auth
│  │  │  │  ├─ check-auth.js
│  │  │  │  └─ check-authority.js
│  │  │  ├─ image-upload.js
│  │  │  ├─ index.js
│  │  │  ├─ object-id-control.js
│  │  │  └─ rate-limiter.js
│  │  ├─ routes
│  │  │  ├─ index.js
│  │  │  └─ user.js
│  │  └─ validators
│  │     ├─ index.js
│  │     └─ user.validator.js
│  ├─ config
│  │  └─ index.js
│  ├─ loaders
│  │  ├─ express.js
│  │  ├─ index.js
│  │  └─ mongoose.js
│  ├─ models
│  │  ├─ index.js
│  │  ├─ log.js
│  │  ├─ token.js
│  │  └─ user.js
│  ├─ utils
│  │  ├─ helpers
│  │  │  ├─ error-helper.js
│  │  │  ├─ generate-random-code.js
│  │  │  ├─ ip-helper.js
│  │  │  ├─ jwt-token-helper.js
│  │  │  └─ local-text-helper.js
│  │  ├─ lang    
│  │  │  ├─ en.json
│  │  │  ├─ get-text.js
│  │  │  └─ tr.json
│  │  ├─ index.js
│  │  ├─ logger.js
│  │  └─ send-code-to-email.js
│  └─ app.js
├─ .env.sample
├─ README.md
├─ .gitignore
├─ LICENSE
├─ package-lock.json
└─ package.json
```

<br />

## [API Documentation](#api-documentation)

To view all APIs and learn all the details required for the requests and responses, run the server and go to http://localhost:3000/api/docs/ in your browser. [Swagger](https://swagger.io/) automatically creates this page by using the definitions and descriptions written as comments in the required files.

### API Endpoints

List of available routes:  
  
**User Auth Routes**:
- Register - POST /api/user
- Login - POST /api/user/login
- Logout - POST /api/user/logout
- Verify Email - POST /api/user/verify-email
- Refresh Token - POST /api/user/refresh-token
- Forgot Password - POST /api/user/forgot-password
- Send Verification Code - POST /api/user/send-verification-code

**User Edit Routes**:
- Edit User - PUT /api/user
- Change Password - POST /api/user/change-password

**Other User Routes**:
- Get User - GET /api/user
- Delete User - DELETE /api/user

<br />

## [Error Handling](#error-handling)

App has catch functions for each async operations. Besides this, in any unwanted request bodies or unwanted situations sends an error response.
There is a helper whose name is 'error-helper'. It takes 3 parameters: code, req, errorMessage (optional if there is).
It takes the English and Turkish result messages seperately by using the code parameter and getText helper.
Sends the required information to logger util to log and after that returns the error-response template which is:

```js
  'resultMessage': {
    'en': enMessage,
    'tr': trMessage
   },
   'resultCode': code
```

<br />

## [Validation](#validation)

Request data is validated using [Joi](https://github.com/hapijs/joi).

The validation schemas are defined in the src/models/index.js directory and are used in the controllers by providing body as the parameter to the specific validation function.

```js
# A sample function in user.validator.js
  function validateEditUser(body) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(24),
        username: Joi.string().min(3).max(15),
        language: Joi.string().valid('tr', 'en'),
        gender: Joi.string().valid('male', 'female', 'other'),
        birthDate: Joi.date()
    });
    return schema.validate(body);
}

//TODO: Update readme files
# A sample call to a validate function
const { userValidator } = require('../../../models/index.js');

const { error } = userValidator.editUser(req.body);
```

<br />

## [Authentication](#authentication)

To require authentication for certain routes, you can use the **check-auth** middleware.

```js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/');
const { auth, imageUpload } = require('../middlewares');

router.put('/', auth, imageUpload, userController.editUser);
```

These routes require a valid JWT access token in the Authorization request header. If the request does not contain a valid access token, an error is thrown.

### Generating Access Tokens:

Access token is generated with the help of jwt-token-helper util. Client can get an access token by sending a successful request to the verify-email (POST /api/user/verify-email), login (POST /api/user/login) or refresh-token (POST /api/user/refresh-token) endpoints. The response of these endpoints also contains a refresh token (explained below).

An access token is valid for 1 hour. You can modify this expiration time by changing the expiresIn property in the jwt-token-helper.js.

### Refreshing Access Tokens:

After the access token expires, a new access token can be generated, by sending a request to the refresh token endpoint (POST /api/user/refresh-token) and sending along a valid refresh token in the request body. If the request terminates successfully, app returns a new access token and a new refresh token.

A refresh token is valid for 7 days. You can modify this expiration time by changing the expiresIn property in the jwt-token-helper.js.

<br />

## [Authorization](#authorization)

To require certain permissions and authority to access certain routes, you can use the **check-authority** middleware.

```js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/');
const { auth, authority } = require('../middlewares');

router.put('/', authority.checkAdmin, userController.SAMPLE_ROUTE);
```

In the example above, an authenticated user can access this route only if has the admin authority/the admin type.
The permissions are role-based. There are 4 roles default: admin-reader-creator-user. You can expand this list and set the authorities of each role acc. to your needs.

If the user making the request does not have the required permissions to access this route, a Forbidden (403) error is thrown.

**3 Types Of Authority Check**:
- **checkAdmin**: controls whether the user has admin type
- **checkCreator**: controls whether the user has admin or creator type
- **checkReader**: controls whether the user is normal user or has some extra permissions

<br />

## [Logging](#logging)

For logging, there is a logger.js in the utils folder. It writes the logs to db by using the Log model. 

I chose to store the logs in the DB for this project. However, you can also choose to store logs in a file instead of DB because of the speed or another problem. 

Both file and DB for storing have some advantages and disadvantages. Actually, there is a trade-off. If you consider speed and file size, you can store the logs in a file.
However, if you consider the query speed and fast access/read/process when you need, easiness to implement and using logs to have some statistics about app/users, storing in the DB is more efficient.

There are unique result messages and result codes for each part of the code. Therefore, when a log is added to DB, you can understand the source of the error if it is not in 'Info' level and understand the action of the user if it is in 'Info' level. All result messages with their result codes are written in the en.json and tr.json files.

Log Model: 

```js
userId: (id of the user who sent the request),
resultCode: (result code to understand which part of the code wrote this log and also to return to the client),
level: (to understand the type of the log, there are 7 options: 'Info'-'Server Error'-'Client Error'-'Uncaught Exception'-'Unhandled Rejection'-'Process-Env'-'External Error'),
errorMessage: (the message contains the details of the error),
ip: (the ip which the request is sent from)
```

<br />

## [Contribution](#contribution)

Contributions are very, very important for me and for those who want to benefit from this resource. I will be very appreciated if you allocate time to contribute.

### How can you contribute?

If you have a new feature that you want to implement or you encountered with a bug that you know the reason of it and like to fix, you can do all of these by following this process:

- Create an issue to explain the details of what you want to do
- Fork the repo
- Clone the repo and set it up
- Implement the necessary changes by following the written code layout
- Send a pull request


### Important notes

- Please do not go beyond the written code layout.
- If you need, create folders acc. to the current folder structure.
- Add specific result codes for each async function with catch.
- Add specific and clear result messages for each result code in both English and Turkish.
- Use only error-helper for error handling by looking at the sample code.
- Use only logger util for logging by looking at the sample code. 

**THANK YOU!**
