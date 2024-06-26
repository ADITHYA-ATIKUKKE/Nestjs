import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService:JwtService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);

        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }

        throw new UnauthorizedException('Invalid Credentials'); // Return null or throw error if authentication fails
    }
    async login(user:any){
        const payload={username:user.username,password:user.password};
        return {
            access_token:this.jwtService.sign(payload),
        };
    }
}
