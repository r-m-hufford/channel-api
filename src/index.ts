import express, {Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import cors from 'cors';
const sequelize = new Sequelize('postgresql://ryanmhufford@localhost:6543/channel');
try {
  sequelize.authenticate();
  console.info('connected to the database')
} catch(error) {
  console.error('Unable to connect to database', error);
}

const app = express();
app.use(cors());
app.use(express.json());



app.get('/api', (req: Request, res: Response) => {
  res.json('contact');
})

app.listen(3000, ()=> {
  console.info('listening on port 3000');
});

