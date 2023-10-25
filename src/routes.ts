import { userRouter } from './routes/users';


export function routes(app: any) {
  app.use('/api/users', userRouter)
}