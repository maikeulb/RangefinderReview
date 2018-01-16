import { Document } from 'mongoose';

export interface User extends Document {
  readonly displayName: string;
  readonly email?: string;
  readonly password?: string;
  readonly passwordResetToken?: string;
  readonly passwordResetExpires?: Date;

  readonly googleAccount?: Google;
  readonly githubAccount?: Github;

  comparePassword?: (candidatePassword: string) => boolean;
  generateHash?: (password: string) => string;
  gravatar?: (size: number) => string;
}

interface Google {
  readonly googleId: string;
  readonly googleToken: string;
}

interface Github {
  readonly githubId: string;
  readonly githubToken: string;
}
