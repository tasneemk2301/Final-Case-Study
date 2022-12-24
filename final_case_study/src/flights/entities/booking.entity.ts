import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { passengerDto } from '../dto/passenger.dto';


@Entity()
export class Booking {

    // @PrimaryGeneratedColumn()
    // id:number;

    @PrimaryGeneratedColumn('uuid')
    pnr: string;

    @Column()
    flight_id: number;

    @Column()
    booked_by: string;

    @Column()
    email: string;

    @Column()
    number_of_seats: number;

    @Column({default:""})
    passengers: string;

    @Column()
    selected_meal: string;

    @Column()
    selected_seat_number: string;

    @Column({ default: "active" })
    status: string;

}
