import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Flight } from "./entities/flight.entity";

@Injectable()
export class FlightsService{
    constructor(
        @InjectRepository(Flight)
        private flightsRepository: Repository<Flight>,
      ) {}

      findAll(): Promise<Flight[]> {
        return this.flightsRepository.find();
      }
    
      findByFlightId(airline_id: number): Promise<Flight> {
        return this.flightsRepository.findOneBy({ airline_id });
      }
    
      async remove(airline_id: number): Promise<void> {
        await this.flightsRepository.delete(airline_id);
      }

      createFlight(flight:Flight): Promise<Flight>{
        return this.flightsRepository.save(flight);
      }

      updateFlight(flight_id:number, flight:Flight): Promise<any>{
        return this.flightsRepository.update(flight_id, flight);
      }

}