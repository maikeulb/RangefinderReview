import { User } from '../interfaces/user.interface'
import { Document, Schema, Error, Model, model } from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';
import * as crypto from 'crypto';
import * as Promise from 'bluebird';
const bcryptAsync: any = Promise.promisifyAll(bcrypt);

export interface UserModel extends User, Document {
  comparePassword?: (candidatePassword: string) => boolean;
  generateHash?: (password: string) => string;
  gravatar?: (size: number) => string;
}

const UserSchema = new Schema({
  displayName: String,
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires:  Date,

  google: { type: Object },
  github: { type: Object },

}, { timestamps: true });

// userSchema.statics.generateHash = function(password) {
//     return bcrypt.hash(password, bcrypt.genSaltSync(8), null);
// };

/**
 * Password hash middleware.
 */

UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword: string) {
  try {
    return bcryptAsync.compareAsync(candidatePassword, this.password);
  }
  catch (err) {
    throw err;
  }
};

UserSchema.methods.gravatar = function(size: number) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export const Users: Model<UserModel> = model<UserModel>('Users', UserSchema);
