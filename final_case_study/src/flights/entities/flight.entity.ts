import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Airline } from './airline.entity';

@Entity() 
export class Flight {
  @PrimaryGeneratedColumn()
  flight_id:number;

  @Column()
  airline_id: number;

  @ManyToOne(() => Airline, (airline:Airline) => airline.flights)
  airline: Airline;

  @Column()
  flight_number: string;

  @Column()
  from_place: string;

  @Column()
  to_place: string;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column()
  total_number_of_business_class_seats: string;

  @Column()
  total_number_of_nonbusiness_class_seats: string;

  @Column()
  ticket_cost: string;

  @Column()
  total_number_of_seats: string;

  @Column()
  meal: string;
}