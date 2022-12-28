import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '../../src/admin/admin.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    AdminModule, 
    PassportModule, 
    JwtModule.register({
      signOptions: {
        expiresIn: "1d",
      },
      secret: jwtConstants.secret,
      // secretOrPrivateKey: jwtConstants.secret,
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {
}
