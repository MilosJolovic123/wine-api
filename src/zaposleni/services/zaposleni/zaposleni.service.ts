import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enolog } from 'src/entities/Enolog';
import { RacunovodjaVinarije } from 'src/entities/RacunovodjaVinarije';
import { SefProizvodnje } from 'src/entities/SefProizvodnje';
import { Zaposleni } from 'src/entities/Zaposleni';
import { Repository } from 'typeorm';

@Injectable()
export class ZaposleniService {

    constructor(@InjectRepository(Zaposleni) private zaposleniRepository: Repository<Zaposleni>,
@InjectRepository(SefProizvodnje) private sefProizvodnjeRepository: Repository<SefProizvodnje>,
@InjectRepository(Enolog) private enlogRepository: Repository<Enolog>,
@InjectRepository(RacunovodjaVinarije) private racunovodjaVinarijeRepository: Repository<RacunovodjaVinarije>
){}


    fetchZaposleni(email):Promise<Zaposleni>{
        return this.zaposleniRepository.findOne({where :{mejl:email},relations:['rola']});
    }
    fetchSefProizvodnje(email):Promise<SefProizvodnje>{
        return this.sefProizvodnjeRepository.findOne({where: {mejl:email},relations:['rola']})
    }
    fetchEnolog(email):Promise<Enolog>{
        return this.enlogRepository.findOne({where: {mejl:email},relations:['rola']})
    }
    fetchRacunovodjaVinarije(email):Promise<RacunovodjaVinarije>{
        return this.racunovodjaVinarijeRepository.findOne({where: {mejl:email},relations:['rola']})
    }



}
