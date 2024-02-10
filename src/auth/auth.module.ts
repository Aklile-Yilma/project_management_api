import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './jwt.strategy';
import { AuthGuard } from './auth.gaurd';
import { RolesGuard } from './roles.gaurd';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        }
      },
    }),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),

  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthGuard, RolesGuard],
  exports: [JwtStrategy, PassportModule, MongooseModule],
})
export class AuthModule {}
