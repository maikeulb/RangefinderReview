export interface User {
  readonly displayName: string;
  readonly email?: string;
  readonly password?: string;
  readonly passwordResetToken?: string;
  readonly passwordResetExpires?: Date;

  readonly googleAccount?: Google;
  readonly githubAccount?: Github;
}

interface Google {
  readonly googleId: string;
  readonly googleToken: string;
}

interface Github {
  readonly githubId: string;
  readonly githubToken: string;
}
