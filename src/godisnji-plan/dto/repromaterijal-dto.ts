import { IsNotEmpty, IsNumber } from "class-validator";

export class RepromaterijalDTO{
    //prosledjuje se direktno sa front-enda
    @IsNotEmpty()
    @IsNumber()
    idRepromaterijala:number;
    //isto moze da se prosledi od parenta proveri servisni sloj
    // @IsNotEmpty()
    // @IsNumber()
    // idGodisnjegPlanaFKS:number;
    //ovo svakako mora da ide 
    // @IsNotEmpty()
    // @IsNumber()
    // idStavkePlana:number;
    //ovo mora da se prosledi
    @IsNumber()
    kolicina:number;
    //ovo moze da se trazi po nazivu i da se zakuca selection na frontendu ili da se 
    //uradi GET svega
    //nazivEnoloskogAditiva:string
    @IsNotEmpty()
    @IsNumber()
    nazivEnoloskogAditiva:string;
}