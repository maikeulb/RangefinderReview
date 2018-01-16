import { Component, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './interfaces/user.interface';
import { UserSchema } from './schemas/user.schema';

import { CreateGithubUserCommand } from './commands/createGithubUser.command';
import { CreateGoogleUserCommand } from './commands/createGoogleUser.command';
import { CreateLocalUserCommand } from './commands/createLocalUser.command';

import { HttpException } from '@nestjs/core';

// import * as nodemailer from "nodemailer";
// const request = require("express-validator");

@Component()
export class UserService {
  constructor(@InjectModel(UserSchema) private readonly userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email: email.toLowerCase() });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string): Promise<User> {
    try {
      console.log(id);
      const user = await this.userModel.findOne(id);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async createGithubUser(command: CreateGithubUserCommand): Promise<User> {
    try {
      const createdUser = new this.userModel(command);
      await createdUser.save();
      return createdUser;
    } catch (err) {
      throw err;
    }
  }

  async createGoogleUser(command: CreateGoogleUserCommand): Promise<User> {
    try {
      const createdUser = new this.userModel(command);
      await createdUser.save();
      return createdUser;
    } catch (err) {
      throw err;
    }
  }

  async createLocalUser(command: CreateLocalUserCommand): Promise<User> {
    try {
      const createdUser = new this.userModel(command);
      await createdUser.save();
      return createdUser;
    } catch (err) {
      throw err;
    }
  }
}
