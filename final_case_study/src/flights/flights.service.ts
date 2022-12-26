import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Airline } from "./entities/airline.entity";
import { Flight } from "./entities/flight.entity";
import { searchDto } from "../../src/flights/dto/search.dto";
import { Booking } from "./entities/booking.entity";

@Injectable()
export class FlightsService{
    constructor(
        @InjectRepository(Flight)
        private flightsRepository: Repository<Flight>,
        @InjectRepository(Airline)
        private airlineRepository: Repository<Airline>,
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>
      ) {}

      async createFlight(flight:Flight): Promise<Flight>{
        const airline= await this.findByAirlineId(flight.airline_id);
        if (!!airline){
          const savedFlight= await this.flightsRepository.save({...flight, airline});
          return savedFlight;
        }
        else {
          throw new Error("Error while creating flight record. Airline does not exist"); 
        }
      }

      findAllFlights(): Promise<Flight[]> {
        return this.flightsRepository.find();
      }
          
      findByFlightId(flight_id: number): Promise<Flight> {
        return this.flightsRepository.findOneBy({ flight_id });
      }

      updateFlight(flight_id:number, flight:Flight): any{
        this.flightsRepository.update(flight_id, flight);
        return 'Flight Updated';
      }

      async remove(airline_id: number): Promise<void> {
        await this.flightsRepository.delete(airline_id);
      }

      addAirline(airline:Airline): Promise<Airline>{
        return this.airlineRepository.save(airline);
      }

      findByAirlineId(id: number): Promise<Airline> {
        return this.airlineRepository.findOneBy({ id });
      }

      updateAirline(airline_id:number, airline:Airline): any{
        this.airlineRepository.update(airline_id, airline);
        return "Airline Updated";
      }

    
      async searchFlightDetails(search:searchDto): Promise<Flight[]>{
        return this.flightsRepository.createQueryBuilder("flight")
        .select(['flight.flight_id AS flight_id',
        'flight.flight_number AS flight_number',
        'airline.name AS airline',
        'flight.from_place AS from_place',
        'flight.to_place AS to_place',
        'flight.start_time AS start_date_time',
        'flight.end_time AS end_date_time',
        'flight.total_number_of_business_class_seats AS total_number_of_business_class_seats',
        'flight.total_number_of_nonbusiness_class_seats AS total_number_of_nonbusiness_class_seats',
        'flight.ticket_cost AS ticket_cost',
        'flight.total_number_of_seats AS total_number_of_seats',
        'flight.meal AS meal'])
        .leftJoin('flight.airline','airline')
        .where('flight.start_time like:date AND flight.from_place=:from_place AND flight.to_place=:to_place AND airline.blocked=:blocked',{date:`${search.date}%`, from_place:search.from_place, to_place:search.to_place, blocked:"no"})
        .getRawMany();
      }

      async createBooking(flightid:number, booking:Booking): Promise<any>{
        const flight= await this.findByFlightId(flightid);
        const pnr= "abc"+ Math.floor(Math.random()*999);
        if (!!flight){
          const savedBooking= await this.bookingRepository.save({...booking,pnr});
          console.log(savedBooking);
          return ({"pnr": pnr});
        }
        else {
          throw new Error("Error while creating booking. Invalid Flight ID"); 
        }
      }

      async getTicketDetails(pnr: string): Promise<Booking>{
          const ticket= await this.bookingRepository.findOneBy({pnr});
          if(!!ticket){
            return ticket;
          }
          else{
            throw new Error("Error while fetching ticket details");
          }

      }

      async getHistoryDetails(emailId:string):Promise<Booking[]>{
        const history= await this.bookingRepository.findBy({email:emailId});
        if(history.length>0){
          return history;
        }
        else{
          throw new Error("Error while fetching history details");
        }
      }

      async getBookingDetails(pnr:string){
          const cancel_booking= await this.bookingRepository.findOneBy({pnr});
          if(!!cancel_booking){
            await this.bookingRepository.delete({pnr:pnr});
            return true;
          }
          else{
            throw new Error("Error while fetching booking details for cancellation");
          }
      }

}