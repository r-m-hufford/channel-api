import { authRouter } from './routes/auth';
import { userRouter } from './routes/users';
import { passwordRouter } from './routes/password';
import { profileRouter } from './routes/profiles';


export function routes(app: any) {
  app.use('/users', userRouter);
  app.use('/auth', authRouter);
  app.use('/password', passwordRouter);
  app.use('/profiles', profileRouter);
}