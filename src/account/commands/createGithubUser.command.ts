export class CreateGithubUserCommand {
  displayName: string;
  githubAccount: {
    githubId: string,
    githubToken: string,
  };
}
