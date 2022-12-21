import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log("validate in local ")
    const adminValid = await this._authService.validateAdmin({username, password});
    if (!!adminValid) {
        return adminValid;
    }
    throw new UnauthorizedException("Admin is not valid");
  }
}