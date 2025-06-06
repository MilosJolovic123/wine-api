import { ProizvodniList } from 'src/entities/ProizvodniList';
import { grozdjeDto } from './grozdje-dto';
import { siraDto } from './Sira-dto';
import { CreateProizvodniListDto } from './proizvodni-list.dto';

export class requestDTO{
    grozdje:grozdjeDto;
    sira:siraDto;
    proizvodniList:CreateProizvodniListDto;
}