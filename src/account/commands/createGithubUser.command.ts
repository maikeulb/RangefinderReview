export class CreateGithubUserCommand {
  displayName: string;
  username: string;
  githubAccount: {
    githubId: string,
    githubToken: string,
  };
}
