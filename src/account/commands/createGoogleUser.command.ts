export class CreateGoogleUserCommand {
  displayName: string;
  email: string;
  googleAccount: {
          googleId: string,
          googleToken: string,
        };
}
