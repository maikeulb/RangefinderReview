export interface IUser {
  readonly displayName: string;
  readonly email?: string;
  readonly password?: string;
  readonly passwordResetToken?: string;
  readonly passwordResetExpires?: Date;

  readonly googleAccount?: IGoogle;
  readonly githubAccount?: IGithub;
}

interface IGoogle {
  readonly googleId: string;
  readonly googleToken: string;
}

interface IGithub {
  readonly githubId: string;
  readonly githubToken: string;
}
