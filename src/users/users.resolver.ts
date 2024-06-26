import { Args, Mutation, Resolver,Query } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import {  UpdateUserInput } from './dto/update-user.input';

@Resolver(()=>User)
export class UsersResolver {
    constructor (private readonly usersService:UsersService){}
    @Query(()=>[User])
    async users():Promise <User[]>{
      return this.usersService.findAll()
    }
    @Mutation(()=>User)
    async CreateUser(@Args('createUserInput') createUserInput:CreateUserInput):Promise<User>{
        return this.usersService.create(createUserInput)
    }
    @Mutation(()=>User)
    async UpdateUser(@Args('updateUserInput') updateUserInput:UpdateUserInput):Promise<User>{
      return this.usersService.update(updateUserInput);
    }
}
