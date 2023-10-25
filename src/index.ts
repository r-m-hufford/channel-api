import express, {Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import cors from 'cors';
import { sequelize } from '../config/db';

//initialize database
sequelize.authenticate()
.then(() => {
  console.log('connected to db');
})
.catch((err) => {
  console.error(err);
});

//import user model and pass in sequelize instance
import { initUser } from './models/user';
import { routes } from './routes';
initUser(sequelize);


const app = express();
app.use(cors());
app.use(express.json());

routes(app);


app.get('/api', (req: Request, res: Response) => {
  res.json('contact');
})

app.listen(3000, ()=> {
  console.info('listening on port 3000');
});

