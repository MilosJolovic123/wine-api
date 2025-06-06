import { IsNotEmpty, IsNumber } from "class-validator";

export class StavkaPListaDTO{

    @IsNotEmpty()
    @IsNumber()
    redniBrojStavkeProizvodnogLista:number;


    @IsNotEmpty()
    @IsNumber()
    kolicina:number;

    @IsNotEmpty()
    @IsNumber()
    nazivEnoloskogAditiva:string;
}