import { IsNotEmpty, IsNumber } from "class-validator";

export class  siraDto{
    @IsNotEmpty()
    @IsNumber()
    koncentracijaSecera:number;
    @IsNotEmpty()
    @IsNumber()
    nivoKiselina;
    @IsNotEmpty()
    @IsNumber()
    kolicina:number;
}