import 'dotenv/config';
import express, {Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import cors from 'cors';
import { sequelize } from '../config/db';
import cookieParser from 'cookie-parser';

//initialize database
sequelize.authenticate()
.then(() => {
  console.log('connected to db');
})
.catch((err) => {
  console.error(err);
});

import { routes } from './routes';
import { initArticle } from './models/article';
import { associateUser, initUser } from './models/user';
import { initRevokedToken } from './models/revoked-token';
import { authMiddleware } from './middleware/auth';
import { errorHandlerMiddleware } from './middleware/httpError';
import { associateProfile, initProfile } from './models/profile';
initArticle(sequelize);
initUser(sequelize);
initRevokedToken(sequelize);
initProfile(sequelize);

associateUser();
associateProfile();


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(authMiddleware);

routes(app);


app.get('/api', (req: Request, res: Response) => {
  res.json('contact');
})
app.use(errorHandlerMiddleware);
app.listen(3000, ()=> {
  console.info('listening on port 3000');
});

