import 'dotenv/config';
import express from 'express';
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
import { associateArticle, initArticle } from './models/article';
import { associateUser, initUser } from './models/user';
import { initRevokedToken } from './models/revoked-token';
import { authMiddleware } from './middleware/auth';
import { errorHandlerMiddleware } from './middleware/httpError';
import { associateProfile, initProfile } from './models/profile';
import { associateTopic, initTopic } from './models/topic';
import { initArticleTopic } from './models/articles-topics';
import { initComment } from './models/comment';
import { initFollow } from './models/follow';
initArticle(sequelize);
initUser(sequelize);
initRevokedToken(sequelize);
initProfile(sequelize);
initTopic(sequelize);
initArticleTopic(sequelize);
initComment(sequelize);
initFollow(sequelize);

associateUser();
associateProfile();
associateArticle();
associateTopic();


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());``

app.use(authMiddleware);

routes(app);

app.use(errorHandlerMiddleware);
app.listen(3000, ()=> {
  console.info('listening on port 3000');
});

