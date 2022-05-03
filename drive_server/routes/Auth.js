import express from 'express';
import jwt from 'jsonwebtoken';

const app = express.Router();
const [CLIENT_KEY, SECRET] = [
  process.env.CLIENT_KEY || 'client_secret',
  process.env.SECRET || 'secr3t',
];

app.post('/', (req, res) => {
  const { key } = req.body;

  if (key !== CLIENT_KEY) {
    return res.sendStatus(403);
  }

  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    data: `${Date.now()}`, // simulating data
  }, SECRET);

  res.json(token);
});

export default app;
