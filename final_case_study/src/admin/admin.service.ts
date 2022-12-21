import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
    private readonly admin = {username: "mike", password: "mike"}

    validAdminCred(username:string, password:string){
      if(username===this.admin.username && password===this.admin.password) {
        return this.admin;
      }
    }
}
