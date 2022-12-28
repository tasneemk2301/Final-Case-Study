import { IsNumber, IsString } from 'class-validator'; 

export class passengerDto {

    @IsString()
    name: string;

    @IsNumber()
    age: number;

    @IsString()
    gender: string;
}