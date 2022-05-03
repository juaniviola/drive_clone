import jwt from 'jsonwebtoken';
const SECRET = process.env.SECRET || 'secr3t';

export default function AuthMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.sendStatus(403);
  }

  const verifiedToken = jwt.verify(token, SECRET);
  if (!verifiedToken) {
    return res.sendStatus(403);
  }

  next();
}
