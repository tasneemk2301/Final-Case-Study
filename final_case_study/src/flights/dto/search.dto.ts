import { IsString } from 'class-validator'; 

export class searchDto {

    @IsString()
    date: string;

    @IsString()
    from_place: string;

    @IsString()
    to_place: string;

    @IsString()
    round_trip: string
}