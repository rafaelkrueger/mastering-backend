import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../services';
import { UserDto, UserLogin } from '../user-dtos';
import {
  CreateNewUserApiDocumentation,
  LoginUserApiDocumentation,
} from '../swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  @CreateNewUserApiDocumentation()
  async createUser(@Body() newUser: UserDto): Promise<string> {
    return await this.userService.create(newUser);
  }

  @Post('/sign-in')
  @LoginUserApiDocumentation()
  async getUser(@Body() user: UserLogin): Promise<any> {
    return await this.userService.getUser(user);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.findById(id);
  }

  @Get('/token/:token')
  async findUserByToken(@Param('token') token: string): Promise<UserDto> {
    return await this.userService.findByToken(token);
  }
}
