import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (err) {
    console.log(err);
    throw new Error('could not connect to Mongodb');
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.log(err);
    throw new Error('could not disconnect from Mongodb');
  }
};
