import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import helmet from 'helmet';

config();

const PORT = process.env.PORT || 8000;

const app: express.Application = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

//listeners
app.listen(PORT, () => {
  console.log('server open');
});
