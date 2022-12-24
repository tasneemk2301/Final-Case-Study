import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { FlightsController } from './flights.controller';
import { Airline } from './entities/airline.entity';
import { Booking } from './entities/booking.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Flight]), TypeOrmModule.forFeature([Airline]), TypeOrmModule.forFeature([Booking])],
  controllers: [FlightsController],
  exports: [TypeOrmModule, FlightsService],
  providers: [FlightsService]
})
export class FlightsModule {}
