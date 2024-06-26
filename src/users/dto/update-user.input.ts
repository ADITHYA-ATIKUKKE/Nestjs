import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput{

    @Field(()=>Int)
    id:number;

    @Field()
    username:string;

    @Field()
    email:string;

    @Field()
    password:string;
}