import app from './app.js';
import { connectToDatabase } from './db/connection.js';

const PORT = process.env.PORT || 8000;

// connect to the database
connectToDatabase()
  .then(() => console.log('Connected to database successfully'))
  .catch((err) => console.log(err));

//listeners
app.listen(PORT, () => {
  console.log('server is running on port ' + PORT);
});
