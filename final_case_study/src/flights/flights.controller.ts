import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Flight } from './entities/flight.entity';
import { FlightsService } from './flights.service';

@Controller('/app/v1')
export class FlightsController {
    constructor(private readonly _flightservice: FlightsService) {}

    @Post('/airline/flight')
    @UseGuards(JwtAuthGuard)
    async createFlight(@Body() flight:Flight){
        try{
            const savedFlight = await this._flightservice.createFlight(flight);
            return savedFlight;
        } catch(e){
            throw new Error("Error while creating flight record");
        }
    }
}
