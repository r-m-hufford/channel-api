import { authRouter } from './routes/auth';
import { userRouter } from './routes/users';
import { passwordRouter } from './routes/password';
import { profileRouter } from './routes/profiles';
import { articlesRouter } from './routes/articles';
import { topicsRouter } from './routes/topics';


export function routes(app: any) {
  app.use('/users', userRouter);
  app.use('/auth', authRouter);
  app.use('/password', passwordRouter);
  app.use('/profiles', profileRouter);
  app.use('/articles', articlesRouter);
  app.use('/topics', topicsRouter);
}