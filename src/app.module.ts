import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module'; // Import your UsersModule
import { User } from './users/user.entity'; // Adjust path as per your project structure
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'src/schema.gql',
      driver: ApolloDriver,
    }),
    JwtModule.register({
      secret:'secetkey',
      signOptions:{expiresIn:'1d'}
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'project',
      entities: [User], // Include User entity here
      synchronize: true,
    }),
    UsersModule,
    AuthModule, // Include UsersModule here
  ],
  controllers: [AppController],
  providers: [AppService, AuthService], // Ensure other providers are listed here if needed
})
export class AppModule {}
