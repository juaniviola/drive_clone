import { exec } from 'child_process';

export default function asyncExec(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr);
      }

      return resolve(stdout);
    });
  });
}
