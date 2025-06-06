import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GodisnjiPlan } from 'src/entities/GodisnjiPlan';
import { StavkaGodisnjegPlana } from 'src/entities/StavkaGodisnjegPlana';
import { Repromaterijal } from 'src/entities/Repromaterijal';
import { Vino } from 'src/entities/Vino';
import { EnoloskiAditiv } from 'src/entities/EnoloskiAditiv';
import { CreateGodisnjiPlanDto } from './../dto/create-godisnji-plan.dto';
import { SefProizvodnje } from 'src/entities/SefProizvodnje';

@Injectable()
export class GodisnjiPlanService {

  constructor(
    @InjectRepository(SefProizvodnje) private sefProizvodnjeRepository: Repository<SefProizvodnje>,
    @InjectRepository(GodisnjiPlan) private godisnjiPlanRepository: Repository<GodisnjiPlan>,
    @InjectRepository(StavkaGodisnjegPlana) private stavkaRepository: Repository<StavkaGodisnjegPlana>,
    @InjectRepository(Repromaterijal) private repromaterijalRepository: Repository<Repromaterijal>,
    @InjectRepository(Vino) private vinoRepository: Repository<Vino>,
    @InjectRepository(EnoloskiAditiv) private enoloskiAditivRepository: Repository<EnoloskiAditiv>
  ) {}

  async create(createGodisnjiPlanDto: CreateGodisnjiPlanDto): Promise<GodisnjiPlan> {
    const sefProizvodnje = await this.sefProizvodnjeRepository.findOne({ where: { mejl: createGodisnjiPlanDto.mejlSefaProizvodnje } });
    
    if (!sefProizvodnje) {
      throw new Error(`SefProizvodnje sa mejlom ${createGodisnjiPlanDto.mejlSefaProizvodnje} nije pronađen!`);
    }

    const godisnjiPlan = this.godisnjiPlanRepository.create(createGodisnjiPlanDto);
    godisnjiPlan.sefProizvodnje = sefProizvodnje;
    godisnjiPlan.aktivan = false;
    godisnjiPlan.zavrsen = false;
   
    const savedPlan = await this.godisnjiPlanRepository.save(godisnjiPlan);

    for (const stavkaDto of createGodisnjiPlanDto.stavke) { 
      const vino = await this.vinoRepository.findOne({where:{nazivVina:stavkaDto.nazivVina}});
      if (!vino) {
        throw new Error(`Vino sa nazivom ${stavkaDto.nazivVina} nije pronađeno`);
      }
      const stavka = this.stavkaRepository.create(stavkaDto);
      stavka.godisnjiPlan = savedPlan;
      stavka.idGodisnjegPlanaFK = savedPlan.idGodisnjegPlana;
      stavka.vino = vino;
      stavka.preostalaKolicina = stavka.kolicina;
      const savedStavka = await this.stavkaRepository.save(stavka);

      if (stavkaDto.repromaterijali) {
        for (const repromaterijalDto of stavkaDto.repromaterijali) {
          const enoloskiAditiv = await this.enoloskiAditivRepository.findOne({where:{naziv:repromaterijalDto.nazivEnoloskogAditiva}});
          if (!enoloskiAditiv) {
            throw new Error(`EnoloskiAditiv sa nazivom ${repromaterijalDto.nazivEnoloskogAditiva} nije pronađen`);
          }

          const repromaterijal = this.repromaterijalRepository.create(repromaterijalDto);
          repromaterijal.stavka = savedStavka;
          repromaterijal.idStavkePlana = savedStavka.redniBrStavke;
          repromaterijal.idGodisnjegPlanaFKS = savedPlan.idGodisnjegPlana;
          repromaterijal.enoloskiAditiv = enoloskiAditiv;
          await this.repromaterijalRepository.save(repromaterijal);
        }
      }
    }

    return savedPlan;
  }

  async findAll(): Promise<GodisnjiPlan[]> {
    return this.godisnjiPlanRepository.find({
      relations: ['sefProizvodnje', 'stavke', 'stavke.vino', 'stavke.repromaterijali',
         'stavke.repromaterijali.enoloskiAditiv']
    });
  }

  async findAllActive(): Promise<GodisnjiPlan[]> {
    return this.godisnjiPlanRepository.find({where:{aktivan:true},
      relations: ['sefProizvodnje', 'stavke', 'stavke.vino', 'stavke.repromaterijali',
         'stavke.repromaterijali.enoloskiAditiv']
    });
  }

  async findOne(id: number): Promise<GodisnjiPlan> {
    return this.godisnjiPlanRepository.findOne({
      where: { idGodisnjegPlana: id },
      relations: ['sefProizvodnje', 'stavke', 'stavke.vino', 'stavke.repromaterijali', 'stavke.repromaterijali.enoloskiAditiv']
    });
  }

  async updateActivate(id: number): Promise<GodisnjiPlan> {
    const godisnjiPlan = await this.godisnjiPlanRepository.findOne({ where: { idGodisnjegPlana: id }, relations: ['sefProizvodnje'] });
    if (!godisnjiPlan) {
      throw new Error(`GodisnjiPlan sa ID-jem: ${id} nije pronađen`);
    }
    if(godisnjiPlan.zavrsen == true)
      throw new Error(`GodisnjiPlan sa ID-jem ${id} je završen!`);
    godisnjiPlan.aktivan = true;
    return this.godisnjiPlanRepository.save(godisnjiPlan);
  }

  async updateDeactivate(id: number): Promise<GodisnjiPlan> {
    const godisnjiPlan = await this.godisnjiPlanRepository.findOne({ where: { idGodisnjegPlana: id }, relations: ['sefProizvodnje'] });
    if (!godisnjiPlan) {
      throw new Error(`GodisnjiPlan sa ID-jem: ${id} nije pronađen`);
    }
    if(godisnjiPlan.zavrsen == true)
      throw new Error(`GodisnjiPlan sa ID-jem ${id} je završen!`);
    godisnjiPlan.aktivan = false;
    return this.godisnjiPlanRepository.save(godisnjiPlan);
  }
    

  async updateClose(id: number): Promise<GodisnjiPlan> {
    const godisnjiPlan = await this.godisnjiPlanRepository.findOne({ where: { idGodisnjegPlana: id }, relations: ['sefProizvodnje'] });
    if (!godisnjiPlan) {
      throw new Error(`GodisnjiPlan sa ID ${id} nije pronađen`);
    }
    godisnjiPlan.aktivan = false;
    godisnjiPlan.zavrsen = true;
    return this.godisnjiPlanRepository.save(godisnjiPlan);
  }

  async remove(id: number): Promise<void> {
    const godisnjiPlan = await this.godisnjiPlanRepository.findOne({ where: { idGodisnjegPlana: id }, relations: ['stavke', 'stavke.repromaterijali'] });
    if (!godisnjiPlan) {
      throw new Error(`GodisnjiPlan sa ID-jem ${id} nije pronađen`);
    }

    for(const stavka of godisnjiPlan.stavke){

      // Remove Repromaterijali
      for (const repromaterijal of stavka.repromaterijali) {
        await this.repromaterijalRepository.delete({ idGodisnjegPlanaFKS: id, idStavkePlana: stavka.redniBrStavke });
      }
      
      // Remove Stavke
      await this.stavkaRepository.delete({ idGodisnjegPlanaFK: id });
      
    }
    // Remove GodisnjiPlan
    const result = await this.godisnjiPlanRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`GodisnjiPlan sa ID-jem ${id} nije pronađen`);
    }
  }
}
