import fs, { constants } from 'fs';

export default function pathExists(path) {
  return new Promise((resolve) => {
    return fs.access(path, constants.R_OK, (err) => {
      if (err) {
        return resolve(false);
      }

      return resolve(true);
    });
  });
}
