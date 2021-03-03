const AWS = require("aws-sdk");
const { User } = require("../../../../models");
const { userValidator } = require("../../../validators");
const { errorHelper, logger, getText, localTextHelper } = require("../../../../utils");
const { awsAccessKey, awsSecretAccessKey, awsRegion, bucketName } = require("../../../../config");

const s3 = new AWS.S3({
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey,
    region: awsRegion,
    signatureVersion: "v4",
});

module.exports = async (req, res) => {
    const { error } = userValidator.editUser(req.body);
    if (error) {
        let code = '00077';
        const message = error.details[0].message;
        if (message.includes("gender"))
            code = '00078';
        else if (message.includes("language"))
            code = '00079';
        else if (message.includes("birthDate"))
            code = '00080';
        else if (message.includes("username"))
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
            Key: localTextHelper.turkishToEnglish(user.name).replace(/\s/g, "").toLowerCase() + "/" + user._id + "/" + Date(Date.now()).toLowerCase().substring(0, 15).replace(/\s/g, "-"),
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
