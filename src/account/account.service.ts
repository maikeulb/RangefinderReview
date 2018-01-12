import { Component, Inject } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { Users, UserModel } from './schemas/user.schema';

@Component()
export class AccountService {

  async findByEmail(email: string): Promise<UserModel> {
    try {
      const user: any = Users.findOne({ email: email.toLowerCase() });
      if (!user) { return Promise.reject('User not found'); }
      if (user) { return Promise.resolve(user); }
    } catch (err) {
      console.log('there was a problem registering');
    }
  }

  async findById(id: string): Promise<UserModel> {
    try {
      const user: any = Users.findOne(id);
      if (!user) { return Promise.reject('User not found'); }
      if (user) { return Promise.resolve(user); }
    } catch (err) {
      console.log('there was a problem registering');
    }
  }

}
