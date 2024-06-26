import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import { UsersService } from "src/users/users.service";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private usersService:UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:'secretkey',
        })
    }
    async validate(payload:any){
        return { userId: payload.sub, username: payload.username };
    }
}