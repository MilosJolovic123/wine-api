import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { StavkaGodisnjegPlanaDTO } from './stavka-godisnjeg-plana-dto';
export class CreateGodisnjiPlanDto {
    @IsNotEmpty()
    @IsDate()
    datumPocetkaRealizacije: Date;
  
    @IsNotEmpty()
    @IsDate()
    datumZavrsetkaRealizacije: Date;
  
    @IsOptional()
    @IsString()
    opisIDodatneNapomene?: string;
  

    @IsOptional()
    @IsNumber()
    mejlSefaProizvodnje?:string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StavkaGodisnjegPlanaDTO)
    stavke: StavkaGodisnjegPlanaDTO[];

}
