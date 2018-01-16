// import { IsEmail, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

// import 'reflect-metadata';
// import { IsDefined, ValidateNested } from 'class-validator';
// import { Type } from 'class-transformer';


export class CreateGoogleUserCommand {
  displayName: string;
  email: string;
  googleAccount: {
    googleId: string,
    googleToken: string,
  };
}
