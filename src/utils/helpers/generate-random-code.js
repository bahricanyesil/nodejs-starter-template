const randomstring = require('randomstring');

module.exports = (length) => randomstring.generate({ length, charset: 'numeric' });