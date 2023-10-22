import express, {Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api', (req: Request, res: Response) => {
  res.json('contact');
})

app.listen(3000, ()=> {
  console.info('listening on port 3000');
});

