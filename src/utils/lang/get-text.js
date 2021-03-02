const en = require('./en');
const tr = require('./tr');

module.exports = (lang, key) => {
    if (lang == 'tr') {
        return tr[key];
    } else {
        return en[key];
    }
};
