import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { UsersRepository } from './users.repository';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // imports: [ConfigModule],
      // inject: [ConfigService],
      // useFactory: async (configService: ConfigService) => {
      //   console.log('------------------------------------')
      //   console.log(configService.get('JWT_SECRET'))
      //   return {
      //     secret: configService.get('JWT_SECRET'),
      //     signOptions: {
      //       expiresIn: configService.get('JWT_EXPIRY')
      //     }
      //   }
      // }
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([UsersRepository])
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
