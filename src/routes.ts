import { authRouter } from './routes/auth';
import { userRouter } from './routes/users';


export function routes(app: any) {
  app.use('/users', userRouter);
  app.use('/auth', authRouter)
}