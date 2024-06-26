import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateLoginInput } from './dto/CreateLogin.input';
import { GqlAuthGuard } from './gql-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @UseGuards(GqlAuthGuard)
    @Post('login')
    login(@Body() createLoginInput:CreateLoginInput){
        return this.authService.login(createLoginInput)
    }

}
