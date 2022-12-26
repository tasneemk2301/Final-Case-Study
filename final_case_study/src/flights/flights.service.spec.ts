import { Test, TestingModule } from '@nestjs/testing';
import { FlightsService } from './flights.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../app.controller';
import { AuthModule } from '../auth/auth.module';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { FlightsModule } from '../flights/flights.module';
import { Repository, UpdateResult } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { Airline } from './entities/airline.entity';
import { flatten } from '@nestjs/common';
import { Booking } from './entities/booking.entity';

describe('FlightsService', () => {
  let service: FlightsService;

  let repoFlight: Repository<Flight>;

  let repoAirline: Repository<Airline>;

  let repoBooking: Repository<Booking>;

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
          controllers: [AppController],
          providers: [AdminService, JwtService, FlightsService, {provide: getRepositoryToken(Flight), useClass: Repository,}, {provide: getRepositoryToken(Airline), useClass: Repository,}, {provide: getRepositoryToken(Booking), useClass: Repository,},],
    }).compile();

    service = module.get<FlightsService>(FlightsService);
    repoFlight = module.get<Repository<Flight>>(getRepositoryToken(Flight));
    repoAirline = module.get<Repository<Airline>>(getRepositoryToken(Airline));
    repoBooking = module.get<Repository<Booking>>(getRepositoryToken(Booking));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should do saving and return flight details', async() => {
    const flight:any = {

        flight_number : "ge789",
    
        airline_id : 2,
    
        from_place : "delhi",
    
        to_place : "pune",
    
        start_time : "17:00",
    
        end_time : "20:10",
    
        total_number_of_business_class_seats : "50",
    
        total_number_of_nonbusiness_class_seats : "50",
    
        ticket_cost : "5000",
    
        total_number_of_seats : "100",
    
        meal : "veg"
    
    };

    const airline:any = {name: 'garuda', blocked: 'no', id: 2};

    const savedFlight:any = {

        flight_id: 1,

        airline: {name: 'garuda', blocked: 'no', id: 2},

        flight_number : "ge789",
    
        airline_id : 2,
    
        from_place : "delhi",
    
        to_place : "pune",
    
        start_time : "17:00",
    
        end_time : "20:10",
    
        total_number_of_business_class_seats : "50",
    
        total_number_of_nonbusiness_class_seats : "50",
    
        ticket_cost : "5000",
    
        total_number_of_seats : "100",
    
        meal : "veg"
    
    };

    jest.spyOn(service, 'findByAirlineId').mockImplementation(() => airline);

    jest.spyOn(repoFlight, 'save').mockImplementation(() => savedFlight);

    let res:any = await service.createFlight(flight);

    expect(res).toBe(savedFlight);

  });

  it('should return error when saving flight details fails', async() => {
    const flight:any = {

        flight_number : "ge789",
    
        airline_id : 2,
    
        from_place : "delhi",
    
        to_place : "pune",
    
        start_time : "17:00",
    
        end_time : "20:10",
    
        total_number_of_business_class_seats : "50",
    
        total_number_of_nonbusiness_class_seats : "50",
    
        ticket_cost : "5000",
    
        total_number_of_seats : "100",
    
        meal : "veg"
    
    };

    const airline:any = {name: 'garuda', blocked: 'no', id: 2};

    const invalid:any = "";

    jest.spyOn(service, 'findByAirlineId').mockImplementation(() => invalid);

    await expect(service.createFlight(flight)).rejects.toThrowError('Error while creating flight record. Airline does not exist')

  });

  it('should return array of flights', async() => {

    const flight:any = {

        flight_id: 1,

        airline: {name: 'garuda', blocked: 'no', id: 2},

        flight_number : "ge789",
    
        airline_id : 2,
    
        from_place : "delhi",
    
        to_place : "pune",
    
        start_time : "17:00",
    
        end_time : "20:10",
    
        total_number_of_business_class_seats : "50",
    
        total_number_of_nonbusiness_class_seats : "50",
    
        ticket_cost : "5000",
    
        total_number_of_seats : "100",
    
        meal : "veg"
    
    };

    jest.spyOn(repoFlight, 'find').mockImplementation(async() => await [flight]);

    let res:any = await service.findAllFlights();

    expect(res).toEqual([flight]);

  });

  it('should return flight by flight ID', async() => {

    const flight:any = {

        flight_id: 1,

        airline: {name: 'garuda', blocked: 'no', id: 2},

        flight_number : "ge789",
    
        airline_id : 2,
    
        from_place : "delhi",
    
        to_place : "pune",
    
        start_time : "17:00",
    
        end_time : "20:10",
    
        total_number_of_business_class_seats : "50",
    
        total_number_of_nonbusiness_class_seats : "50",
    
        ticket_cost : "5000",
    
        total_number_of_seats : "100",
    
        meal : "veg"
    
    };

    jest.spyOn(repoFlight, 'findOneBy').mockImplementation(async() => flight);

    let res:any = await service.findByFlightId(1);

    expect(res).toEqual(flight);

  });

  it('should update flight', async() => {

    const flight:any = {

        flight_id: 1,

        airline: {name: 'garuda', blocked: 'no', id: 2},

        flight_number : "ge789",
    
        airline_id : 2,
    
        from_place : "delhi",
    
        to_place : "pune",
    
        start_time : "17:00",
    
        end_time : "20:10",
    
        total_number_of_business_class_seats : "50",
    
        total_number_of_nonbusiness_class_seats : "50",
    
        ticket_cost : "5000",
    
        total_number_of_seats : "100",
    
        meal : "veg"
    
    };


    let res:any = await service.updateFlight(1, flight);

    expect(res).toBe("Flight Updated");

  });

  it('should remove flight', async() => {

    const func=jest.spyOn(repoFlight, 'delete').mockImplementation(async() =>  void 0);

    let res:any = await service.remove(1);

    expect(func).toHaveBeenCalledTimes(1);

  });

  it('should add airline', async() => {

    const airline:any = {name:"indigo", blocked:"no", id:4};

    jest.spyOn(repoAirline, 'save').mockImplementation(async() =>  airline);

    let res:any = await service.addAirline(airline);

    expect(res).toEqual(airline);

  });

  it('should return airline by id', async() => {

    const airline:any = {name:"indigo", blocked:"no", id:4};

    jest.spyOn(repoAirline, 'findOneBy').mockImplementation(async() =>  airline);

    let res:any = await service.findByAirlineId(4);

    expect(res).toEqual(airline);

  });

  it('should update airline by id', async() => {

    const airline:any = {name:"indigo", blocked:"no", id:4};

    let res:any = await service.updateAirline(4,airline);

    expect(res).toEqual("Airline Updated");

  });

  it('should return flight details on search', async() => {

    const flights:any = {

        flight_id: 1,

        airline: 'garuda',

        flight_number : "ge789",
    
        airline_id : 2,
    
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

    const search:any = {date: "23/02/2023", from_place: "delhi", to_place: "pune", round_trip: "yes"};

    const createQueryBuilder:any = {
        select: () => createQueryBuilder,
        leftJoin: () => createQueryBuilder,
        where : () => createQueryBuilder,
        getRawMany: () => flights,
    };

    jest.spyOn(repoFlight, 'createQueryBuilder').mockImplementation(() => createQueryBuilder)

    let res:any = await service.searchFlightDetails(search);

    expect(res).toEqual(flights);

  });

  it("should create booking and return pnr ", async() =>{

    const flight:any = {

        flight_id: 1,

        airline: {name: 'garuda', blocked: 'no', id: 2},

        flight_number : "ge789",
    
        airline_id : 2,
    
        from_place : "delhi",
    
        to_place : "pune",
    
        start_time : "17:00",
    
        end_time : "20:10",
    
        total_number_of_business_class_seats : "50",
    
        total_number_of_nonbusiness_class_seats : "50",
    
        ticket_cost : "5000",
    
        total_number_of_seats : "100",
    
        meal : "veg"
    
    };

    const booking:any = {

        flight_id: 1,
    
        booked_by: "mahesh",
    
        email: "mahesh@gmail.com",
    
        number_of_seats: 2,
    
        passengers: [{"name": "suresh", "age":24, "gender":"male"}, {"name": "ramesh", "age":22, "gender":"male"}],
    
        selected_meal: "veg",
    
        selected_seat_number: null
    
    };

    const booked:any = {

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

    jest.spyOn(service, "findByFlightId").mockImplementation(() => flight);

    jest.spyOn(repoBooking, "save").mockImplementation(() => booked);

    let res: any = await service.createBooking(1, booking);

    expect(res).toHaveProperty("pnr");

  });

  it("should return error when flight Id not valid while booking", async() => {

    const booking:any = {

        flight_id: 4,
    
        booked_by: "mahesh",
    
        email: "mahesh@gmail.com",
    
        number_of_seats: 2,
    
        passengers: [{"name": "suresh", "age":24, "gender":"male"}, {"name": "ramesh", "age":22, "gender":"male"}],
    
        selected_meal: "veg",
    
        selected_seat_number: null
    
    };

    const invalid:any = "";

    jest.spyOn(service, "findByFlightId").mockImplementation(() => invalid);
    
    await expect(service.createBooking(4, booking)).rejects.toThrowError("Error while creating booking. Invalid Flight ID");
    
  });

  it("should return ticket by pnr", async() => {

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

    jest.spyOn(repoBooking, "findOneBy").mockImplementation(() => ticket);

    let res:any = await service.getTicketDetails("abc816");

    expect(res).toEqual(ticket);

  });

  it("should return error when fetching ticket by wrong pnr", async() => {

    const invalid:any = "";

    jest.spyOn(repoBooking, "findOneBy").mockImplementation(() => invalid);

    await expect(service.getTicketDetails("abc676")).rejects.toThrowError("Error while fetching ticket details");

  });

  it("should return history by email", async() => {

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

    jest.spyOn(repoBooking, "findBy").mockImplementation(async() => [ticket_history]);

    let res:any = await service.getHistoryDetails("mahesh@gmail.com");

    expect(res).toEqual([ticket_history]);

  });  

  it("should return error when history is looked by wrong email", async() => {

    const invalid:any = ""
       
    jest.spyOn(repoBooking, "findBy").mockImplementation(() => invalid);

    await expect(service.getHistoryDetails("jyoti@gmail.com")).rejects.toThrowError("Error while fetching history details");

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

    jest.spyOn(repoBooking, "findOneBy").mockImplementation(() => booking);

    jest.spyOn(repoBooking, "delete").mockImplementation(() => void 0);

    let res:any = await service.getBookingDetails("abc816");

    expect(res).toBe(true);

  });

  it("should return error when cancelling booking by wrong pnr", async() => {
       
    const invalid:any = "";

    jest.spyOn(repoBooking, "findOneBy").mockImplementation(() => invalid);

    await expect(service.getBookingDetails("abc923")).rejects.toThrowError("Error while fetching booking details for cancellation");

  });


});
