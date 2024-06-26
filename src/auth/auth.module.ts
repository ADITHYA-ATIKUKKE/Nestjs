import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {JwtStrategy} from './jwt.strategy'
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports:[
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret:'secetkey',
            signOptions:{expiresIn:'5d'}
        })
    ],
    providers:[AuthService,JwtStrategy, AuthResolver],
    exports:[AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
