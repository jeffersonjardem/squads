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

UserSchema.pre('save', function cb(next) {
  const salt = bcrypt.genSaltSync();
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

UserSchema.methods.checkPassword = function checkPassword(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', UserSchema);

export default User;
