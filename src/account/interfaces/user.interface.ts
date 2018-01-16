import { Document } from 'mongoose';

export interface User extends Document {
  readonly email?: string;
  readonly password?: string;

  readonly googleAccount?: Google;
  readonly githubAccount?: Github;

  comparePassword?: (candidatePassword: string) => boolean;
  generateHash?: (password: string) => string;
}

interface Google {
  readonly googleId: string;
  readonly googleToken: string;
}

interface Github {
  readonly githubId: string;
  readonly githubToken: string;
}
