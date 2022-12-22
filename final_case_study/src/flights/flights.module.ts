import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { FlightsController } from './flights.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Flight])],
  controllers: [FlightsController],
  exports: [TypeOrmModule, FlightsService],
  providers: [FlightsService]
})
export class FlightsModule {}
