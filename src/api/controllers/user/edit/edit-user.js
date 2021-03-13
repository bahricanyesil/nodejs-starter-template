import { User } from '../../../../models/index.js';
import { validateEditUser } from '../../../validators/user.validator.js';
import { errorHelper, logger, getText, turkishToEnglish } from '../../../../utils/index.js';
import { awsAccessKey, awsSecretAccessKey, awsRegion, bucketName } from '../../../../config/index.js';
import aws from 'aws-sdk';
const { S3 } = aws;

const s3 = new S3({
  accessKeyId: awsAccessKey,
  secretAccessKey: awsSecretAccessKey,
  region: awsRegion,
  signatureVersion: 'v4',
});

export default async (req, res) => {
  const { error } = validateEditUser(req.body);
  if (error) {
    let code = '00077';
    const message = error.details[0].message;
    if (message.includes('gender'))
      code = '00078';
    else if (message.includes('language'))
      code = '00079';
    else if (message.includes('birthDate'))
      code = '00080';
    else if (message.includes('username'))
      code = '00081';
    return res.status(400).json(errorHelper(code, req, message));
  }

  const user = await User.findById(req.user._id).catch((err) => {
    return res.status(500).json(errorHelper('00082', req, err.message));
  });

  if (req.body.name) user.name = req.body.name;
  if (req.body.gender) user.gender = req.body.gender;
  if (req.body.birthDate) user.birthDate = req.body.birthDate;
  if (req.body.language) user.language = req.body.language;
  if (req.body.username && req.body.username !== user.username) {
  const exist = await User.exists({ username: req.body.username }).catch((err) => {
    return res.status(500).json(errorHelper('00083', req, err.message));
  });
  if (exist) return res.status(400).json(errorHelper('00084', req));

  user.username = req.body.username;
  }
  let hasError = false;
  if (req.file) {
  const params = {
    Bucket: bucketName,
    Key: turkishToEnglish(user.name).replace(/\s/g, '').toLowerCase() + '/' + user._id + '/' + Date(Date.now()).toLowerCase().substring(0, 15).replace(/\s/g, '-'),
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  await s3.upload(params).promise().then((data) => {
    user.photoUrl = data.Location;
  }).catch(err => {
    hasError = true;
    return res.status(500).json(errorHelper('00087', req, err.message)).end();
  });
  }

  if (!hasError) {
  await user.save().catch((err) => {
    return res.status(500).json(errorHelper('00085', req, err.message));
  });

  //NOTE: The only thing we should send to the front is the url of the uploaded photo. Front-end knows all other changes.
  logger('00086', req.user._id, getText('en', '00086'), 'Info', req);
  return res.status(200).json({
    resultMessage: { en: getText('en', '00086'), tr: getText('tr', '00086') },
    resultCode: '00086',
    photoUrl: user.photoUrl
  });
  }
};

/**
 * @swagger
 * /user:
 *    put:
 *      summary: Edit the Profile Information
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *        - in: formData
 *          name: image
 *          required: false
 *          schema:
 *            type: file
 *          description: Image file here
 *      requestBody:
 *        description: Some of the user profile information to change
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                username:
 *                  type: string
 *                language:
 *                  type: string
 *                  enum: ['tr', 'en']
 *                gender:
 *                  type: string
 *                  enum: ['male', 'female', 'other']
 *                birthDate:
 *                  type: string
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: Your profile information was changed successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          resultCode:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          photoUrl:
 *                              type: string
 *        "400":
 *          description: Please provide valid values for each key you want to change.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "401":
 *          description: Invalid token.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */