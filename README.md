# nodejs-starter-template
You can use this template when you're starting a new project. It contains general concepts, you can customize it according to your needs.

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose.

You will get a production-ready Node.js app installed and configured on your machine. The app comes with many built-in features, such as authentication using JWT, request validation, error handling, logging, image uploading (to AWS bucket), email sending, etc.

Social logins (Google&Apple), unit and integration tests, in-app purchases (Google&Apple), daily crons, notifications (firebase), API documentation, pagination, etc could be added in the future. Get ready for more, star it and wait!

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
