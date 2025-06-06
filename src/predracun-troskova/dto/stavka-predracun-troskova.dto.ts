import { IsNotEmpty, IsNumber } from "class-validator";

export class StavkaPredracunaDTO{

    @IsNotEmpty()
    @IsNumber()
    idStavkePredracuna:number;
    @IsNotEmpty()
    @IsNumber()
    kolicina:number;
    @IsNotEmpty()
    @IsNumber()
    idEnoloskogAditiva:number;
}