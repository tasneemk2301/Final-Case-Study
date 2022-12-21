import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { adminDto } from './admin/admin.dto';
import { AdminService } from './admin/admin.service';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller('/app/v1')
export class AppController {
  constructor(private readonly _appService: AppService, private readonly _adminservice: AdminService, private readonly _authService: AuthService) {}

  @Post('/flight/admin/login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() admin:adminDto, @Req() req:Request) {
    if(!!admin.username && !!admin.password){
      const valid= await this._adminservice.validAdminCred(admin.username, admin.password);
      if(valid){
        console.log("Admin logged in successfully");
        return this._authService.generateToken(req['user']);
      }
      else {
        return ("Invalid Admin Credentials");
      }
    }
  }
}
