/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { RegisterDTO } from './dto/register.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/shared/guards/jwt.guard';
import { LoginDTO, LoginResponseDTO } from './dto/login.dto';
import { LoginGuard } from 'src/shared/guards/login.guard';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User)
  @UseGuards(JwtGuard)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOneById(id);
  }

  @Query((returns) => [User])
  @UseGuards(JwtGuard)
  async users() {
    return this.userService.findAll();
  }

  @Mutation((returns) => User)
  async register(@Args('registerData') registerData: RegisterDTO) {
    return this.userService.register(registerData);
  }

  @Mutation((returns) => LoginResponseDTO)
  @UseGuards(LoginGuard)
  async login(@Args('loginData') loginData: LoginDTO) {
    return this.userService.login(loginData);
  }
}
