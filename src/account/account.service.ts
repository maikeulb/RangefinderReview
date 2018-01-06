import { Component, Inject } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { User, IUserModel } from './schemas/user.schema';
import { IUser } from './interfaces/user.interface';

@Component()
export class AccountService {

  async findByEmail(email: string): Promise<IUserModel> {
    try {
      const user: any = User.findOne({ email: email.toLowerCase() });
      if (!user) { return Promise.reject('User not found'); }
      if (user) { return Promise.resolve(user); }
    } catch (err) {
      console.log('there was a problem registering');
    }
  }

  async findById(id: string): Promise<IUserModel> {
    try {
      const user: any = User.findOne(id);
      if (!user) { return Promise.reject('User not found'); }
      if (user) { return Promise.resolve(user); }
    } catch (err) {
      console.log('there was a problem registering');
    }
  }

  async register(user: IUserModel): Promise<void> {
    try {
      const existingUser: IUserModel  = await this.findByEmail(user.email);
      if (!existingUser) { user.save(); return Promise.resolve(); }
      if (existingUser) { return Promise.reject('User exits'); }
    } catch (err) {
      console.log('there was a problem registering');
    }
  }

}
