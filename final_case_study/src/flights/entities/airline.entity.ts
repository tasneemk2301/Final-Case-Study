import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Flight } from './flight.entity';

@Entity()
export class Airline {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: "no" })
  blocked: string ;

  @OneToMany(() => Flight, (flight:Flight)=>flight.airline, {onDelete: 'CASCADE', onUpdate:'CASCADE'})
  flights: Flight[];

}