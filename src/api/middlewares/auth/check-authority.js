import { User } from '../../../models/index.js';
import { errorHelper } from '../../../utils/index.js';

export async function checkAdmin(req, res, next) {
  const user = await User.findById(req.user._id).select('type')
    .catch(err => {
      return res.status(500).json(errorHelper('00016', req, err.message));
    });

  if (user.type !== 'admin') return res.status(403).json(errorHelper('00017', req));

  next();
}
export async function checkCreator(req, res, next) {
  const user = await User.findById(req.user._id).select('type')
    .catch(err => {
      return res.status(500).json(errorHelper('00018', req, err.message));
    });

  if (user.type !== 'creator' && user.type !== 'admin')
    return res.status(403).json(errorHelper('00019', req));

  next();
}
export async function checkReader(req, res, next) {
  const user = await User.findById(req.user._id).select('type')
    .catch(err => {
      return res.status(500).json(errorHelper('00020', req, err.message));
    });

  if (user.type === 'user') return res.status(403).json(errorHelper('00021', req));

  next();
}
