const en = require('./en.json');
const tr = require('./tr.json');

module.exports = (lang, key) => {
    if (lang == 'tr') {
        return tr[key];
    } else {
        return en[key];
    }
};
