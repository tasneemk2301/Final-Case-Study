import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { passengerDto } from '../dto/passenger.dto';

@Entity()
export class Booking {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    pnr: string;

    @Column()
    flight_id: number;

    @Column()
    booked_by: string;

    @Column()
    email: string;

    @Column()
    number_of_seats: number;

    @Column('json')
    passengers: passengerDto[];

    @Column()
    selected_meal: string;

    @Column({nullable:true})
    selected_seat_number: string;

    @Column({ default: "active" })
    status: string;

}
