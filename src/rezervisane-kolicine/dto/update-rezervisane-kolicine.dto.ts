import { PartialType } from '@nestjs/mapped-types';
import { CreateRezervisaneKolicineDto } from './create-rezervisane-kolicine.dto';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateRezervisaneKolicineDto {
    
    @IsNotEmpty()
    @IsString()
    mejlZaposlenogKomercijaliste:string;

    @IsNotEmpty()
    @IsNumber()
    kolicinaZaRezervaciju:number;
}
