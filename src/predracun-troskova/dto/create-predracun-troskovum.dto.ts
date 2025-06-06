import { Type } from 'class-transformer';
import { StavkaPredracunaDTO } from './stavka-predracun-troskova.dto';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class CreatePredracunTroskovaDto {

    @IsNotEmpty()
    @IsString()
    napomene:string;
    @IsNotEmpty()
    @IsDate()
    datumIzdavanja:Date;
    @IsNotEmpty()
    @IsString()
    uzrokPrekoracenja:string;
    @IsNotEmpty()
    @IsNumber()
    idGodisnjegPlana;
    
    @IsNotEmpty()
    @IsNumber()
    idRacunovodje;
    @IsNotEmpty()
    @IsNumber()
    idVrstePredracuna;
    @IsNumber()
    idOsnovnogPredracuna;
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StavkaPredracunaDTO)
    stavkePredracunaDTOS:StavkaPredracunaDTO[];
}
