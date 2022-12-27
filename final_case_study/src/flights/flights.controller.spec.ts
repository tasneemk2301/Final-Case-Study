import { Test, TestingModule } from '@nestjs/testing';
import { FlightsController } from './flights.controller';
import { AppController } from '../app.controller';
import { AuthModule } from '../auth/auth.module';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { FlightsModule } from '../flights/flights.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '..//auth/auth.service';
import { FlightsService } from './flights.service';
import { Airline } from './entities/airline.entity';
import { Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { Booking } from './entities/booking.entity';
import { Response } from 'express';


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
          providers: [AdminService, JwtService, FlightsService, {provide: getRepositoryToken(Flight), useClass: Repository,}, {provide: getRepositoryToken(Airline), useClass: Repository,}, {provide: getRepositoryToken(Booking), useClass: Repository,},],
    }).compile();

    flightRepository = module.get<Repository<Flight>>(getRepositoryToken(Flight));
    airlineRepository = module.get<Repository<Airline>>(getRepositoryToken(Airline));
    bookingRepository = module.get<Repository<Booking>>(getRepositoryToken(Booking));
    flightsController = module.get<FlightsController>(FlightsController);
    adminService = new AdminService();
    _flightService = module.get<FlightsService>(FlightsService);;
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

  it("should create flight", async() =>{

    const flight:any = {
        flight_id: 342,

        flight_number : "ge789",
    
        airline_id : 2,

        airline: {name:"indigo", blocked:"no", id:1},
    
        from_place : "delhi",
    
        to_place : "pune",
    
        start_time : "23/02/2023 17:00",
    
        end_time : "23/02/2023 20:10",
    
        total_number_of_business_class_seats : "50",
    
        total_number_of_nonbusiness_class_seats : "50",
    
        ticket_cost : "5000",
    
        total_number_of_seats : "100",
    
        meal : "veg"
    
    };

    jest.spyOn(_flightService, 'createFlight').mockImplementation(()=> flight);

    let res:any = await flightsController.createFlight(flight);

    expect(res).toEqual(flight);

  });

  it("should return list of flights based on search", async() =>{

    const flight:any = {
        flight_id: 342,

        flight_number : "ge789",
    
        airline_id : 2,

        airline: {name:"indigo", blocked:"no", id:1},
    
        from_place : "delhi",
    
        to_place : "pune",
    
        start_time : "23/02/2023 17:00",
    
        end_time : "23/02/2023 20:10",
    
        total_number_of_business_class_seats : "50",
    
        total_number_of_nonbusiness_class_seats : "50",
    
        ticket_cost : "5000",
    
        total_number_of_seats : "100",
    
        meal : "veg"
    
    };

    const search:any = {
        date: "23/02/23",
        from_place: "delhi",
        to_place: "pune",
        round_trip: "yes"
    };

    jest.spyOn(_flightService, 'searchFlightDetails').mockImplementation(async()=> [flight]);

    let res:any = await flightsController.searchFlights(search);

    expect(res).toEqual([flight]);

  });

  it("should save booking details and generate pnr", async() =>{

    const booking:any = {

        flight_id: 789,
    
        booked_by: "mahesh",
    
        email: "mahesh@gmail.com",
    
        number_of_seats: 2,
    
        passengers: [{"name": "suresh", "age":24, "gender":"male"}, {"name": "ramesh", "age":22, "gender":"male"}],
    
        selected_meal: "veg",
    
        selected_seat_number: null
    
    };

    const result: any = {"pnr": "abc816"};

    jest.spyOn(_flightService, 'createBooking').mockImplementation(()=> result);

    let res:any = await flightsController.bookFlight(789, booking);

    expect(res).toHaveProperty("pnr");

  });

  it("should get ticket by pnr", async() => {

    const ticket:any = {

        id: 1,

        pnr: "abc816",

        flight_id: 1,
    
        booked_by: "mahesh",
    
        email: "mahesh@gmail.com",
    
        number_of_seats: 2,
    
        passengers: [{"name": "suresh", "age":24, "gender":"male"}, {"name": "ramesh", "age":22, "gender":"male"}],
    
        selected_meal: "veg",
    
        selected_seat_number: null,

        status: "active"
    
    };

    jest.spyOn(_flightService, "getTicketDetails").mockImplementation(() => ticket);

    let res:any = await flightsController.getTicket("abc816");

    expect(res).toEqual(ticket);

  });

  it("should get ticket history by emailId", async() =>{

    const ticket_history:any = {

        id: 1,

        pnr: "abc816",

        flight_id: 1,
    
        booked_by: "mahesh",
    
        email: "mahesh@gmail.com",
    
        number_of_seats: 2,
    
        passengers: [{"name": "suresh", "age":24, "gender":"male"}, {"name": "ramesh", "age":22, "gender":"male"}],
    
        selected_meal: "veg",
    
        selected_seat_number: null,

        status: "active"
    
    };

    jest.spyOn(_flightService, "getHistoryDetails").mockImplementation(async() => [ticket_history]);

    let res:any = await flightsController.getHistory("mahesh@gmail.com");

    expect(res).toEqual([ticket_history]);

  });

  it("should cancel booking by pnr", async() => {
       
    const booking:any = {

        id: 1,

        pnr: "abc816",

        flight_id: 1,
    
        booked_by: "mahesh",
    
        email: "mahesh@gmail.com",
    
        number_of_seats: 2,
    
        passengers: [{"name": "suresh", "age":24, "gender":"male"}, {"name": "ramesh", "age":22, "gender":"male"}],
    
        selected_meal: "veg",
    
        selected_seat_number: null,

        status: "active"
    
    };

    let responseObject = {
        status: 200,
        message: 'Booking Cancelled'
    };

    const response: any= {
        status: jest.fn().mockImplementation().mockReturnValue(204),
        json: jest.fn().mockImplementation().mockReturnValue(responseObject),
    } as unknown as Response;

    jest.spyOn(_flightService, "getBookingDetails").mockImplementation(() => booking);

    let res:any = await flightsController.cancelBooking("abc816", response);

    expect(response.status()).toBe(204);

  });

});
