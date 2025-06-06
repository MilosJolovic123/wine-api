import { Type } from "class-transformer";
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { StavkaPListaDTO } from "./stavka-proizvodnog-lista.dto";

export class CreateProizvodniListDto {
    @IsNotEmpty()
    @IsString()
    opisINapomene:string;
    @IsNotEmpty()
    @IsNumber()
    mejlEnologa:string;
    @IsNotEmpty()
    @IsNumber()
    idGodPlana:number;
    @IsNotEmpty()
    @IsNumber()
    idStavkeGodPlana:number;

    //stavke proizv. lista
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>StavkaPListaDTO)
    stavke:StavkaPListaDTO[];
}

   



