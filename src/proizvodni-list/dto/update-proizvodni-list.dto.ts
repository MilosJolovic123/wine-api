import { PartialType } from '@nestjs/mapped-types';
import { CreateProizvodniListDto } from './proizvodni-list.dto';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { StavkaPListaDTO } from './stavka-proizvodnog-lista.dto';

export class UpdateProizvodniListDto extends PartialType(CreateProizvodniListDto) {
    @IsNotEmpty()
    @IsNumber()
    idPLista:number;
    @IsNotEmpty()
    @IsNumber()
    idEnologa:number;
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>StavkaPListaDTO)
    stavke:StavkaPListaDTO[];

}
