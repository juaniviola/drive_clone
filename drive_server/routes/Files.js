import express from 'express';
import { promisify } from 'util';
import getPathUtil from '../utils/getPathUtil.js';
import pathExists from '../utils/pathExists.js';
import authMiddleware from '../utils/AuthMiddleware.js';

const app = express.Router();

const filenameHasADot = (filePath) => {
  let index = filePath.length - 1;
  let hasDot = false;
  while (index > 0 && filePath[index] != '/') {
    if (filePath[index] === '.') hasDot = true;
    index -= 1;
  }

  return hasDot;
};

app.post('/save', authMiddleware, async (req, res) => {
  const filePath = req.body.filePath ? `/${req.body.filePath}` : '';
  const { name: fileName } = req.files.file;

  const { pathname } = getPathUtil(`../files${filePath}/${fileName}`);
  const moveFile = promisify(req.files.file.mv);

  try {
    if (await pathExists(pathname)) {
      return res.sendStatus(403);
    }

    await moveFile(pathname);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get('/download', async (req, res) => {
  const { filePath } = req.query;

  if (!filenameHasADot(filePath)) {
    return res.sendStatus(400);
  }

  try {
    const { pathname } = getPathUtil(`../files/${filePath}`);

    if (!(await pathExists(pathname)) || !filePath.includes('.')) {
      return res.sendStatus(403)
    }

    res.download(pathname, (err) => {
      if (err) console.error(err);
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default app;
