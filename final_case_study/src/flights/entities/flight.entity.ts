import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Flight {
  @PrimaryColumn()
  airline_id: number;

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