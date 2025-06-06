import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRezervisaneKolicineDto {
    

    @IsNotEmpty()
    @IsNumber()
    mejlKomercijaliste:string;

    @IsNotEmpty()
    @IsString()
    PIB:string;

    @IsNotEmpty()
    @IsNumber()
    redniBrStavke:number;

    @IsNotEmpty()
    @IsNumber()
    idGodisnjegPlanaFK:number;

    @IsNotEmpty()
    @IsNumber()
    kolicinaZaRezervaciju:number;
    
}
