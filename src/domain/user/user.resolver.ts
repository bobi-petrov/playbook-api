/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOneById(id);
  }

  @Query((returns) => [User])
  async users() {
    return this.userService.findAll();
  }
}
