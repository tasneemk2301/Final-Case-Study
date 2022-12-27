import { Test, TestingModule } from '@nestjs/testing';
import { FlightsController } from './flights.controller';
import { AppController } from '../app.controller';
import { AuthModule } from '../auth/auth.module';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { FlightsModule } from '../flights/flights.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '..//auth/auth.service';
import { FlightsService } from './flights.service';
import { Airline } from './entities/airline.entity';
import { Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { Booking } from './entities/booking.entity';


describe('FlightsController', () => {
  let flightsController: FlightsController;
  let _flightService: FlightsService;
  let adminService: AdminService;
  let authService: AuthService;
  let jwtService: JwtService;
  let airlineRepository:Repository<Airline>;
  let flightRepository:Repository<Flight>;
  let bookingRepository:Repository<Booking>;

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
            synchronize:true
          }), AdminModule, AuthModule, FlightsModule],
          controllers: [AppController, FlightsController],
          providers: [AdminService, JwtService, FlightsService],
    }).compile();

    flightsController = module.get<FlightsController>(FlightsController);
    adminService = new AdminService();
    _flightService = new FlightsService(flightRepository, airlineRepository, bookingRepository);
    jwtService = new JwtService();
    authService = new AuthService(adminService, jwtService);
  });

  afterEach(()=>{
    adminService = null;
    jwtService = null;
    authService = null;
    _flightService = null;
    flightsController = null;
  });

  it('should be defined', () => {
    expect(flightsController).toBeDefined();
  });

  it('should add airline', async() => {

    const airline:any = {name:"AirIndia", blocked:"no", id: 201};

    jest.spyOn(_flightService, 'addAirline').mockImplementation(()=> airline);

    let res:any= await flightsController.addNewAirline(airline);

    expect(res).toEqual(airline);

  });
  
  it("should update airline blocked status", async() => {

    const airline:any = {name:"AirIndia", blocked:"yes", id: 77};

    jest.spyOn(_flightService, 'updateAirline').mockImplementation(()=> "Airline Updated");

    jest.spyOn(_flightService, 'findByAirlineId').mockImplementation(()=> airline);

    let res:any = await flightsController.updateAirlineStatus(77, airline);

    expect(res).toEqual(airline);

});




});
