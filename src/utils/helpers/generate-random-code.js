import { generate } from 'randomstring';

export default (length) => generate({ length, charset: 'numeric' });