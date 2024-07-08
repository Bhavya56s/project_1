import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app.js';

dotenv.config({ path: './src/.env' })



const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not set");
}
console.log('Mongo URI:', process.env.MONGO_URI);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Could not connect to MongoDB', err);
});
