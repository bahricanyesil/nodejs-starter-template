export default (req) => req.headers['x-forwarded-for']
  ? req.headers['x-forwarded-for'].split(/, /)[0]
  : req.connection.remoteAddress;