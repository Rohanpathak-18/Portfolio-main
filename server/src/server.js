import 'dotenv/config';
import app from './app.js';
import connectDatabase from './config/database.js';

const port = process.env.PORT || 5000;

try {
  await connectDatabase();
  app.listen(port, () => console.log(`Portfolio API listening on port ${port}`));
} catch (error) {
  console.error('Unable to start the portfolio API:', error.message);
  process.exit(1);
}
