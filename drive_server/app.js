import express, { urlencoded } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();
const { files, folders, home, auth } = routes;

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

app.use('/', home);
app.use('/folders', folders);
app.use('/files', files);
app.use('/auth', auth);

export default app;
