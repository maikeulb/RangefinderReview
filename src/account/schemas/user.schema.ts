import { Document, Schema, Error, Model, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
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
