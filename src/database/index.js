import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: true
});

export default mongoose;
