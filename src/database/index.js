import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default mongoose;
