import { IsNotEmpty, IsNumber } from "class-validator";

export class grozdjeDto{
    @IsNotEmpty()
    @IsNumber()
    idGrozdja:number;
}