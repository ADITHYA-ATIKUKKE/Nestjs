import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @UseGuards(GqlAuthGuard)
    @Post()
    create(@Body() createUserInput:CreateUserInput){
        return this.usersService.create(createUserInput) 
    }
    @UseGuards(GqlAuthGuard)
    @Get()
    findAll(){
        return this.usersService.findAll();
    }
    @UseGuards(GqlAuthGuard)
    @Get(':username')
    findByUserName(@Param('username') username:string){
        return this.usersService.findOneByUsername(username);
    }
    @UseGuards(GqlAuthGuard)
    @Get('byEmail/:email')
    findByEmail(@Param('email') email:string){
        return this.usersService.findOneByEmail(email);
    }
    @UseGuards(GqlAuthGuard)
    @Put('update/:id')
    update(@Param('id') id:number,@Body() updateUserDto:UpdateUserInput){
        return this.usersService.update(updateUserDto);
    }
}
