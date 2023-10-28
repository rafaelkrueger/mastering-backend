import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../user-dtos/user.dto';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from '../exceptions';
import { UserLogin } from '../user-dtos';
import { JwtService } from '@nestjs/jwt';
import { Encryption } from './encryption';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDto>,
    private readonly jwtService: JwtService,
    private readonly encription: Encryption,
  ) {}

  async create(user: UserDto) {
    const userAlreadyExists = await this.findByEmailAndPassword(user.email);
    if (userAlreadyExists) {
      throw new UserAlreadyExistsException();
    }
    user.password = await this.encryptPassword(user.password);
    const createdUser = await new this.userModel(user);
    const newUser = await createdUser.save();

    const payload = { sub: newUser.id };
    const options = {
      expiresIn: 3600000,
      privateKey: 'dandocapipoca',
    };

    const accessToken = await this.generateAccessToken(payload, options);
    await this.userModel
      .updateOne({ _id: createdUser._id }, { token: accessToken })
      .exec();

    return accessToken;
  }

  async findByToken(token: string) {
    return await this.userModel.findOne({ token: token });
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async findTeachers() {
    return await this.userModel.find({ isTeacher: true });
  }

  async update(id: string, user: UserDto) {
    await this.userModel.updateOne({ _id: id }, user).exec();
    return this.findById(id);
  }

  private async findByEmailAndPassword(email: string) {
    return await this.userModel.findOne({
      email: email,
    });
  }

  async getUser(user: UserLogin) {
    const userEntity = await this.userModel.findOne({
      email: user.email,
    });
    const passwordCorrect = await this.validatePassword(
      userEntity,
      user.password,
    );
    const payload = { sub: userEntity._id };
    const options = {
      expiresIn: 3600000,
      privateKey: 'dandocapipoca',
    };
    const accessToken = await this.generateAccessToken(payload, options);
    if (userEntity && passwordCorrect) {
      await this.userModel
        .updateOne({ _id: userEntity._id }, { token: accessToken })
        .exec();
      return accessToken;
    } else {
      throw new UserNotFoundException();
    }
  }

  private async encryptPassword(plainTextPassword: string): Promise<string> {
    Logger.log('Encrypting password...');
    const encryptedPassword = await this.encription.encrypt(plainTextPassword);
    Logger.log('Password encrypted');
    return encryptedPassword;
  }

  private async validatePassword(
    user: UserDto,
    password: string,
  ): Promise<boolean> {
    if (user) {
      const checkedPassword = await this.encription.compare(
        password,
        user.password,
      );
      return checkedPassword;
    }
    return false;
  }

  async generateAccessToken(payload: any, options: any) {
    return await this.jwtService.sign(payload, options);
  }
}
