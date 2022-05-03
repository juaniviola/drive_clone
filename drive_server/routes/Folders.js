import express from 'express';
import fs from 'fs';
import getPathUtil from '../utils/getPathUtil.js';
import pathExists from '../utils/pathExists.js';
import asyncExec from '../utils/asyncExec.js';
import authMiddleware from '../utils/AuthMiddleware.js';

const app = express.Router();

app.post('/create', authMiddleware, async (req, res) => {
  const { folderName, path } = req.body;

  if (!folderName || folderName.includes('.') || folderName.includes('-') || folderName === 'folder.zip') {
    return res.sendStatus(403);
  }

  try {
    const { pathname } = getPathUtil(`../files/${path || ''}`);

    if (await pathExists(`${pathname}/${folderName}`)) {
      return res.sendStatus(403);
    }

    await fs.promises.mkdir(`${pathname}/${folderName}`);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/download', async (req, res) => {
  const folderPath = req.query.folderPath || '';

  try {
    const { pathname } = getPathUtil(`../files/${folderPath}`);
    if (!(await pathExists(pathname))) {
      return res.sendStatus(403);
    };

    await asyncExec(`cd ./files/ && zip -r folder.zip ./${folderPath}`)

    res.download('./files/folder.zip', async (err) => {
      if (err) console.error(err);
      await asyncExec('cd ./files && rm -rf folder.zip');
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default app;
