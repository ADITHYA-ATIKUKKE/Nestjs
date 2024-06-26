import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateLoginInput{
    @Field()
    username:string;

    @Field()
    password:string;
}