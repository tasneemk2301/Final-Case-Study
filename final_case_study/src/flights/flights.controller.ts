import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Airline } from './entities/airline.entity';
import { Flight } from './entities/flight.entity';
import { FlightsService } from './flights.service';
import { searchDto } from './dto/search.dto';
import { Booking } from './entities/booking.entity';

@Controller('/app/v1')
export class FlightsController {
    constructor(private readonly _flightservice: FlightsService) {}


    @Post('/airline')
    @UseGuards(JwtAuthGuard)
    async addNewAirline(@Body() airline: Airline){
        try{
            const savedAirline = await this._flightservice.addAirline(airline);
            return savedAirline;
        } catch(e){
            throw new Error("Error while creating airline record");
        }
    }

    @Put('airline/:id')
    @UseGuards(JwtAuthGuard)
    async updateAirlineStatus(@Param() id: number,@Body() airline: Airline){
        try{
            
            const updateAirline = await this._flightservice.updateAirline(id, airline);
            const savedAirline = await this._flightservice.findByAirlineId(id);
            if (!!savedAirline)
            {
                return (savedAirline);
            }
            else 
            {
                throw new Error;
            }
        } catch(e){
            throw new Error("Airline ID does not exist..Error while updating airline record");
        }
    }

    @Post('/airline/flight')
    @UseGuards(JwtAuthGuard)
    async createFlight(@Body() flight:Flight){
        try{
            const savedFlight = await this._flightservice.createFlight(flight);
            console.log(savedFlight);
            return savedFlight;
        } catch(e){
            throw new Error("Error while creating flight record");
        }
    }

    @Get('/flight/search')
    async searchFlights(@Body() search:searchDto){
        try{
            const flights= this._flightservice.searchFlightDetails(search);
            return flights;

        }catch(e){
            throw new Error("No flights found.");
        }
    }
    @Post('/flight/booking/:flightid')
    async bookFlight(@Param('flightid', ParseIntPipe) flightid:number, @Body() booking:Booking){
        try{
            console.log(booking);
            const booking_details= this._flightservice.createBooking(flightid, booking);
            return booking_details;

        }catch(e){
            throw new Error("Error in booking");
        }
    }

    @Get('/join')
    async join(){
        return await this._flightservice.joinQuery();
    }

    @Get('/flights')
    async flights(){
        const flights=this._flightservice.findAllFlights();
        return flights;
    }

    
}
