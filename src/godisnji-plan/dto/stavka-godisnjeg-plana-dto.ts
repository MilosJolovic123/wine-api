import { IsArray, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { RepromaterijalDTO } from "./repromaterijal-dto";
import { Type } from "class-transformer";

export class StavkaGodisnjegPlanaDTO{

    @IsNotEmpty()
    @IsNumber()
    redniBrStavke:number;
    
    // @IsNotEmpty()
    // @IsNumber()
    // idGodisnjegPlanaFK:number;

    
    @IsNotEmpty()
    opisIDodatneNapomene:string;

    @IsNumber()
    kolicina:number;

    //inicijalno prilikom kreiranja nula kasnije ce se dodavati
    @IsNumber()
    preostalaKolicina:number;
    //ovo treba promeniti u naziv vina i pretrazivati ga
    //u servisnoj klasi po tim parametrima
    @IsNumber()
    nazivVina:string;
    //ovo treba pretrazivati po nazivu enoloskog aditiva jer moze da se zakuca na front-endu
    @IsOptional()
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>RepromaterijalDTO)
    repromaterijali?:RepromaterijalDTO[];

}