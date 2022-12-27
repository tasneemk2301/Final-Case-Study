import { Body, ConflictException, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../src/auth/jwt-auth.guard';
import { Airline } from './entities/airline.entity';
import { Flight } from './entities/flight.entity';
import { FlightsService } from './flights.service';
import { searchDto } from './dto/search.dto';
import { Booking } from './entities/booking.entity';
import { Response } from 'express';

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
            const flights= await this._flightservice.searchFlightDetails(search);
            return flights;

        }catch(e){
            throw new Error("No flights found.");
        }
    }

    @Post('/flight/booking/:flightid')
    async bookFlight(@Param('flightid', ParseIntPipe) flightid:number, @Body() booking:Booking){
        try{
            const booking_details= await this._flightservice.createBooking(flightid, booking);
            return booking_details;

        }catch(e){
            throw new Error("Error in booking");
        }
    }

    @Get('/flight/ticket/:pnr')
    async getTicket(@Param('pnr') pnr:string){
        try{
            const ticket_details= await this._flightservice.getTicketDetails(pnr);
            return ticket_details;

        }catch(e){
            throw new Error("Error in pnr");
        }

    }

    @Get('/flight/booking/history/:emailId')
    async getHistory(@Param('emailId') emailId:string){
        try{
            const history_details= await this._flightservice.getHistoryDetails(emailId);
            return history_details;

        }catch(e){
            throw new Error("Error in email ID");
        }

    }

    @Put('/flight/booking/cancel/:pnr')
    async cancelBooking(@Param('pnr') pnr:string, @Res({passthrough:true}) res:Response){
        try{
            const booking= await this._flightservice.getBookingDetails(pnr);
            if(!!booking){
                console.log("Canceled Booking");
                res.status(204);
            }           

        }catch(e){
            throw new Error("Error in pnr");
        }

    }

    
}
