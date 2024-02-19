import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginDTO {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class LoginResponseDTO {
  @Field()
  access_token: string;
}
