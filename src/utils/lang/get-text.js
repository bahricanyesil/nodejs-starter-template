import en from './en.js';
import tr from './tr.js';

export default (lang, key) => {
  if (lang == 'tr') {
    return tr[key];
  } else {
    return en[key];
  }
};
