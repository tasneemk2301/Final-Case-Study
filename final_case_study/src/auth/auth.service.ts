import { BadRequestException, Injectable } from '@nestjs/common';
import { adminDto } from 'src/admin/admin.dto';
import { AdminService } from '../../src/admin/admin.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly _adminService: AdminService,
        private readonly _jwtService: JwtService
    ){}

    async validateAdmin(admin: adminDto):Promise<any>{
        console.log("auth service validate admin")
        let validAdmin = await this._adminService.validAdminCred(admin.username, admin.password);
        if(validAdmin){

            const {username, password} = validAdmin;

            return {username, password};
        }
        throw new BadRequestException("Admin is not valid");

    }

    generateToken(admin:adminDto):any{
        const {username} = admin;
        const payload = {username};
        const token = this._jwtService.sign(payload);
        return {token: token};
    }
}