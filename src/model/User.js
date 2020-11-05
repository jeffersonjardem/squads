import bcrypt from 'bcryptjs';
import mongoose from '../database/index';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

UserSchema.set('timestamps', true);

UserSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = async function checkPassword(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', UserSchema);

export default User;
