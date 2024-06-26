import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
    imports:[TypeOrmModule.forFeature([User]),
            JwtStrategy,
            PassportModule,
            JwtModule.register({
                secret:'secretkey',
                signOptions:{expiresIn:'5d'}
            })
        ],
    providers:[UsersService,UsersResolver],
    exports:[UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
