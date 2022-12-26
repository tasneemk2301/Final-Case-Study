import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../app.controller';
import { AuthModule } from '../auth/auth.module';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { FlightsModule } from '../flights/flights.module';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
    let service: AuthService;
    let adminService: AdminService;
    let jwtService: JwtService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
              imports: [TypeOrmModule.forRoot({
              type: 'mysql',
              host: 'localhost',
              port: 3306,
              username: 'root',
              password: 'pass@word1',
              database: 'flightbooking', 
              entities: [],
              autoLoadEntities: true,
              synchronize: true
            }), AdminModule, AuthModule, FlightsModule],
            controllers: [AppController],
            providers: [AdminService, JwtService],
      }).compile();
  
      service = module.get<AuthService>(AuthService);
      adminService = new AdminService();
      jwtService = new JwtService();
    });

    afterEach(()=>{
        adminService = null;
        jwtService = null;
        service = null;
      });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('validate admin details', async() => {
        const data:any = {user:{username: "mike", password: "mike"}};
        
        jest.spyOn(adminService, 'validAdminCred').mockImplementation(() => data['user']);

        let res:any = await service.validateAdmin(data['user']);

        expect(res).toEqual({username: "mike", password: "mike"});
    });

    it('should recieve error on failed admin validation', async() => {
        const data:any = {user:{username: "cts", password: "cts459abc"}};
        const invalid:any ="";
        
        jest.spyOn(adminService, 'validAdminCred').mockImplementation(() => invalid);

        await expect(service.validateAdmin(data['user'])).rejects.toThrowError('Admin is not valid');
    });

    it('should recieve token', async() => {
        const data:any = {user:{username: "mike", password: "mike"}};
        
        let res:any = await service.generateToken(data['user']);

        expect(res).toHaveProperty("token");
    });
});
