import { VrstaPredracuna } from '../../entities/VrstaPredracuna';
import { Injectable } from '@nestjs/common';
import { CreatePredracunTroskovaDto } from '../dto/create-predracun-troskovum.dto';
import { UpdatePredracunTroskovumDto } from '../dto/update-predracun-troskovum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GodisnjiPlan } from 'src/entities/GodisnjiPlan';
import { Repository } from 'typeorm';
import { PredracunTroskova } from 'src/entities/PredracunTroskova';
import { StavkaPredracuna } from 'src/entities/StavkaPredracuna';
import { Rola } from 'src/entities/Rola';
import { RacunovodjaVinarije } from 'src/entities/RacunovodjaVinarije';
import { EnoloskiAditiv } from 'src/entities/EnoloskiAditiv';

@Injectable()
export class PredracunTroskovaService {
  
  constructor(
    @InjectRepository(GodisnjiPlan) private godisnjiPlanRepository: Repository<GodisnjiPlan>,
    @InjectRepository(PredracunTroskova) private predracunRepository: Repository<PredracunTroskova>,
    @InjectRepository(StavkaPredracuna) private stavkaPredracunaRepository: Repository<StavkaPredracuna>,
    @InjectRepository(VrstaPredracuna) private vrstaPredracunaRepository:Repository<VrstaPredracuna>,
    @InjectRepository(Rola) private rolaRepository:Repository<Rola>,
    @InjectRepository(RacunovodjaVinarije) private racunovodjaRepository:Repository<RacunovodjaVinarije>,
    @InjectRepository(EnoloskiAditiv) private aditivRepository:Repository<EnoloskiAditiv>

  ){}
  
  async createOsnovni(createPredracunTroskovaDto: CreatePredracunTroskovaDto):Promise<PredracunTroskova> {
  
    const zaduzeniRacunovodja = await this.racunovodjaRepository.findOne({where:{IDRacunovodje:createPredracunTroskovaDto.idRacunovodje}});
    if(!zaduzeniRacunovodja){
      throw new Error(`Racunovodja sa ID-jem ${zaduzeniRacunovodja.IDRacunovodje} nije pronađen!`);
    }
    const vrstaPredracuna = await this.vrstaPredracunaRepository.findOne({where:{idVrstePredracuna:createPredracunTroskovaDto.idVrstePredracuna}});
    if(!vrstaPredracuna){
      throw new Error(`Vrsta predračuna sa ID-jem ${vrstaPredracuna.idVrstePredracuna} nije pronađena!`);
    }
    const GodisnjiPlan = await this.godisnjiPlanRepository.findOne({where:{idGodisnjegPlana:createPredracunTroskovaDto.idGodisnjegPlana}});
    if(!GodisnjiPlan){
      throw new Error(`Godišnji plan sa ID-jem ${GodisnjiPlan.idGodisnjegPlana} nije pronađen!`);
    }
    const noviPredracun = await this.predracunRepository.create(createPredracunTroskovaDto);

    noviPredracun.godisnjiPlan = GodisnjiPlan;
    noviPredracun.racunovodja = zaduzeniRacunovodja;
    noviPredracun.vrstaPredracuna = vrstaPredracuna;
    const sacuvaniPredracun = await this.predracunRepository.save(noviPredracun);
    for(const stavka of createPredracunTroskovaDto.stavkePredracunaDTOS){
      const stavkaZaUbacivanje = await this.stavkaPredracunaRepository.create(stavka);
      const aditivZaPovezivanje = await this.aditivRepository.findOne({where:{idEnoloskogAditiva:stavka.idEnoloskogAditiva}});
      if(!aditivZaPovezivanje){
        throw new Error(`Aditiv sa ID-jem ${aditivZaPovezivanje.idEnoloskogAditiva} nije pronađen!`);
      }
      stavkaZaUbacivanje.enoloskiAditiv = aditivZaPovezivanje;
      stavkaZaUbacivanje.ukupnaCena = stavka.kolicina*aditivZaPovezivanje.cenaPoJediniciMere;
      stavkaZaUbacivanje.predracun = noviPredracun;
      stavkaZaUbacivanje.idPredracuna = sacuvaniPredracun.idPredracuna;
      noviPredracun.ukupnaCena +=stavkaZaUbacivanje.ukupnaCena;
      await this.stavkaPredracunaRepository.save(stavkaZaUbacivanje); 
    }

    return sacuvaniPredracun;


  }

  async createDodatni(createPredracunTroskovaDto: CreatePredracunTroskovaDto):Promise<PredracunTroskova> {
  
    const zaduzeniRacunovodja = await this.racunovodjaRepository.findOne({where:{IDRacunovodje:createPredracunTroskovaDto.idRacunovodje}});
    if(!zaduzeniRacunovodja){
      throw new Error(`Racunovodja sa ID-jem ${createPredracunTroskovaDto.idRacunovodje} nije pronađen!`);
    }
    const vrstaPredracuna = await this.vrstaPredracunaRepository.findOne({where:{idVrstePredracuna:createPredracunTroskovaDto.idVrstePredracuna}});
    if(!vrstaPredracuna){
      throw new Error(`Vrsta predračuna sa ID-jem ${createPredracunTroskovaDto.idVrstePredracuna} nije pronađena!`);
    }
    const GodisnjiPlan = await this.godisnjiPlanRepository.findOne({where:{idGodisnjegPlana:createPredracunTroskovaDto.idGodisnjegPlana}});
    if(!GodisnjiPlan){
      throw new Error(`Godišnji plan sa ID-jem ${createPredracunTroskovaDto.idGodisnjegPlana} nije pronađen!`);
    }

    const osnovniPredracun = await this.predracunRepository.findOne({where:{idPredracuna:createPredracunTroskovaDto.idOsnovnogPredracuna}});
    if(!osnovniPredracun){
      throw new Error(`Dati osnovni predračun sa ID-jem ${createPredracunTroskovaDto.idOsnovnogPredracuna} nije pronađen!`);
    }


    const noviPredracun = await this.predracunRepository.create(createPredracunTroskovaDto);
    noviPredracun.osnovniPredracun = osnovniPredracun;
    
    //logika oko dodavanja dodatnog u niz
    // if (!osnovniPredracun.dodatniPredracuni || osnovniPredracun.dodatniPredracuni.length === 0) {
    //   osnovniPredracun.dodatniPredracuni = [] as PredracunTroskova[];
    // }
    // osnovniPredracun.dodatniPredracuni.push(noviPredracun);
    // this.predracunRepository.save(osnovniPredracun);

    noviPredracun.godisnjiPlan = GodisnjiPlan;
    noviPredracun.racunovodja = zaduzeniRacunovodja;
    noviPredracun.vrstaPredracuna = vrstaPredracuna;
    const sacuvaniPredracun = await this.predracunRepository.save(noviPredracun);
    for(const stavka of createPredracunTroskovaDto.stavkePredracunaDTOS){
      const stavkaZaUbacivanje = await this.stavkaPredracunaRepository.create(stavka);
      const aditivZaPovezivanje = await this.aditivRepository.findOne({where:{idEnoloskogAditiva:stavka.idEnoloskogAditiva}});
      if(!aditivZaPovezivanje){
        throw new Error(`Aditiv sa ID-jem ${aditivZaPovezivanje.idEnoloskogAditiva} nije pronađen!`);
      }
      stavkaZaUbacivanje.enoloskiAditiv = aditivZaPovezivanje;
      stavkaZaUbacivanje.ukupnaCena = stavka.kolicina*aditivZaPovezivanje.cenaPoJediniciMere;
      stavkaZaUbacivanje.predracun = noviPredracun;
      stavkaZaUbacivanje.idPredracuna = sacuvaniPredracun.idPredracuna;
      noviPredracun.ukupnaCena +=stavkaZaUbacivanje.ukupnaCena;
      await this.stavkaPredracunaRepository.save(stavkaZaUbacivanje); 
    }

    return sacuvaniPredracun;


  }




  async findAll() {
    return await this.predracunRepository.find({
      relations:['godisnjiPlan','racunovodja','vrstaPredracuna','stavkePredracuna','stavkePredracuna.enoloskiAditiv']
    })
  }

  async findOne(id: number) {
    return await this.predracunRepository.find({
      relations:['godisnjiPlan','racunovodja','vrstaPredracuna','stavkePredracuna','stavkePredracuna.enoloskiAditiv']
    ,where:{idPredracuna:id}})
  }

  // async update(updatePredracunTroskovumDto: UpdatePredracunTroskovumDto):Promise<PredracunTroskova> {
    
  // }
  //samo kaskadno brisanje zajedno sa planom proizvodnje
  // remove(id: number) {
  //   return `This action removes a #${id} predracunTroskovum`;
  // }
}
