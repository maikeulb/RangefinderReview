import { Component } from '@nestjs/common';

@Component()
export class SecretKey {
    googleClientID: string;
    googleClientSecret: string;

    githubClientId: string;
    githubClientSecret: string;

    constructor() {
        this.googleClientID = '260242537696-6jo4di1vab2hs4tq2o5gk7sc0l6dsqvo.apps.googleusercontent.com';
        this.googleClientSecret = 'Tmrrk3c8NtCbBIARKhijNzpj';

        this.githubClientId = '1fc4adf567db42715313'
        this.githubClientSecret = '55efa44dd7230fdc05e14e3cb283dd231a2977a8';
    }

    getGoogleKeys(): any {
        return {
            clientID: this.googleClientID,
            clientSecret: this.googleClientSecret
        };
    }

    getGithubKeys(): any {
        return {
            clientID: this.githubClientId,
            clientSecret: this.githubClientSecret
        };
    }
}
