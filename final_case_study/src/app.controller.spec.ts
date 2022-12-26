import { AdminService } from '../src/admin/admin.service';
import { AuthService } from '../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';

describe('AppController', () => {
  
  let adminService: AdminService;
  let authService: AuthService;
  let jwtService: JwtService;
  let appController: AppController;

  beforeEach(()=>{
    adminService = new AdminService();
    jwtService = new JwtService();
    authService = new AuthService(adminService, jwtService);
    appController = new AppController(adminService, authService);
  });

  afterEach(()=>{
    adminService = null;
    jwtService = null;
    authService = null;
    appController = null;
  });


  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should login and generate token', async() => {
    const data:any = {user:{username: "mike", password: "mike"}};


    jest.spyOn(adminService, 'validAdminCred').mockImplementation(() => data['user']);
    jest.spyOn(authService, 'generateToken').mockImplementation(() => "token");
   

    let res:string = await appController.login(data['user'],data);

    expect(res).toContain("token");
  });

  it('should display error', async() => {

    const data:any = {user:{username: "local", password: "local123"}};
    const invalid:any ="";


    jest.spyOn(adminService, 'validAdminCred').mockImplementation(() => invalid);
    jest.spyOn(authService, 'generateToken').mockImplementation(() => "Invalid Admin Credentials");
   

    let res:string = await appController.login(data['user'],data);

    expect(res).toBe("Invalid Admin Credentials");
    
  });

});
