import { Document, Schema, Error, Model, model } from 'mongoose';
import { User } from '../interfaces/user.interface'
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export const UserSchema = new Schema({
  displayName: String,
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires:  Date,

  google: { type: Object },
  github: { type: Object },

}, { timestamps: true });

UserSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password'))
      return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async (candidatePassword: string) => {
  try {
    const hashedPassword = await bcrypt.compare(candidatePassword, this.password);
    return hashedPassword;
  }
  catch (err) {
    throw err;
  }
};
