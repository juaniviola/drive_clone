import express from 'express';
import getPathUtil from '../utils/getPathUtil.js';
import asyncExec from '../utils/asyncExec.js';
import pathExists from '../utils/pathExists.js';
import authMiddleware from '../utils/AuthMiddleware.js';

const app = express.Router();

app.get('/showdir', authMiddleware, async (req, res) => {
  const filePath = req.query.filePath || '';
  if (filePath.includes('.')) {
    return res.sendStatus(403);
  }

  try {
    const { pathname } = getPathUtil(`../files/${filePath}`);

    const output = await asyncExec(`ls ${pathname}`);
    const [_, ...directory] = output.split('\n').sort();
    res.json(directory);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/delete', authMiddleware, async (req, res) => {
  const { path } = req.body;
  if (!path) {
    return res.sendStatus(403);
  }

  try {
    const { pathname } = getPathUtil(`../files/${path}`);
    if (!(await pathExists(pathname))) {
      return res.sendStatus(403);
    }

    await asyncExec(`rm -rf ${pathname}`);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default app;
