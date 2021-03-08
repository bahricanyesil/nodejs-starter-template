import pkg from 'mongoose';
const { Types } = pkg;
import { errorHelper } from '../../utils/index.js';

export default (req, res, next) => {
  if (!req.params.id)
    return res.status(400).json(errorHelper('00022', req));

  if (!Types.ObjectId.isValid(req.params.id))
    return res.status(400).json(errorHelper('00023', req));

  next();
}