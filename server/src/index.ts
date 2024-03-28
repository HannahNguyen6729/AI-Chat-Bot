import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectToDatabase } from './db/connection.js';

config();

const PORT = process.env.PORT || 8000;

const app: express.Application = express();

// connect to the database
connectToDatabase()
  .then(() => console.log('Connected to database successfully'))
  .catch((err) => console.log(err));

//middleware
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

app.use(helmet());
app.use(cors());
app.use(express.json());

//listeners
app.listen(PORT, () => {
  console.log('server is running on port ' + PORT);
});
