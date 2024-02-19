import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterDTO {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  repeatPassword: string;

  @Field()
  email: string;
}
