import mongoose from 'mongoose';
const config = require('./../config')

const connection = {};

const connectDb = async () => {
  if (connection.isConnected) {
    console.log('Using existing connection');
    return;
  }

  const db = await mongoose.connect(config.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Database Connected');
  connection.isConnected = db.connections[0].readyState;
};

export default connectDb;
