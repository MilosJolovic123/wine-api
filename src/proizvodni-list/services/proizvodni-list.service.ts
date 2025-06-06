import { Injectable } from '@nestjs/common';
import { UpdateProizvodniListDto } from '../dto/update-proizvodni-list.dto';
import { ProizvodniList } from 'src/entities/ProizvodniList';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enolog } from 'src/entities/Enolog';
import { StavkaProizvodnogLista } from 'src/entities/StavkaProizvodnogLista';
import { GodisnjiPlan } from 'src/entities/GodisnjiPlan';
import { EnoloskiAditiv } from 'src/entities/EnoloskiAditiv';
import { Sira } from 'src/entities/Sira';
import { Grozdje } from 'src/entities/Grozdje';
import { StavkaGodisnjegPlana } from 'src/entities/StavkaGodisnjegPlana';
import { grozdjeDto } from '../dto/grozdje-dto';
import { siraDto } from '../dto/Sira-dto';
import { CreateProizvodniListDto } from '../dto/proizvodni-list.dto';

@Injectable()
export class ProizvodniListService {

  constructor(
    @InjectRepository(ProizvodniList) private proizvodniListRepository: Repository<ProizvodniList>,
    @InjectRepository(Enolog) private enologRepository:Repository<Enolog>,
    @InjectRepository(StavkaProizvodnogLista) private StavkaProizvodnogListaRepository:Repository<StavkaProizvodnogLista>,
    @InjectRepository(StavkaGodisnjegPlana) private stavkaGodisnjiPlanaRepository: Repository<StavkaGodisnjegPlana>, 
    @InjectRepository(EnoloskiAditiv) private enoloskiAditivRepository:Repository<EnoloskiAditiv>,
    @InjectRepository(Sira) private siraRepostitory:Repository<Sira>,
    @InjectRepository(Grozdje) private grozdjeRepository:Repository<Grozdje>
  ){}


  async getGrozdje():Promise<Grozdje[]>{
    return await this.grozdjeRepository.find();
  }

  async create(grozdjeDTO:grozdjeDto,siraDTO:siraDto,createProizvodniListDto:CreateProizvodniListDto): Promise<ProizvodniList> {
    
    const zaduzeniEnolog = await this.enologRepository.findOne({where:{mejl:createProizvodniListDto.mejlEnologa}});
    

    if(!zaduzeniEnolog){
      throw new Error(`Enolog sa ID-jem ${createProizvodniListDto.mejlEnologa} nije pronađen!`)
    }

    const proizvodniList = this.proizvodniListRepository.create(createProizvodniListDto);
    proizvodniList.enolog = zaduzeniEnolog;

    
    const stavkaGodisnjegPlana = await this.stavkaGodisnjiPlanaRepository.findOne({where:{idGodisnjegPlanaFK:createProizvodniListDto.idGodPlana,redniBrStavke:createProizvodniListDto.idStavkeGodPlana}});
    if(!stavkaGodisnjegPlana){
      throw new Error(`Godisnji plan sa ID-jem ${createProizvodniListDto.idGodPlana} nije pronađen!`);
    }

    proizvodniList.stavkaGodisnjiPlan = stavkaGodisnjegPlana;
    //console.log(proizvodniList.stavkaGodisnjiPlan.idGodisnjegPlanaFK +' '+proizvodniList.stavkaGodisnjiPlan.redniBrStavke);
    proizvodniList.datumPoslednjeIzmene = new Date();
    proizvodniList.datumPrvogIzdavanja = new Date();
    const savedProizvodniList = await this.proizvodniListRepository.save(proizvodniList);

    for(const stavka of createProizvodniListDto.stavke){
      const enoloskiAditiv = await this.enoloskiAditivRepository.findOne({where:{naziv:stavka.nazivEnoloskogAditiva}})
      if(!enoloskiAditiv){
        throw new Error(`EnoloskiAditiv sa nazivom ${stavka.nazivEnoloskogAditiva} nije pronadjen!}`);

      }
  
      const stavkaPLista = this.StavkaProizvodnogListaRepository.create(stavka);
      stavkaPLista.enoloskiAditiv = enoloskiAditiv;
      stavkaPLista.proizvodniList = savedProizvodniList;
      stavkaPLista.idPLista = savedProizvodniList.idPLista;
      await this.StavkaProizvodnogListaRepository.save(stavkaPLista);
    }
      
    const sira = this.siraRepostitory.create(siraDTO);
    const grozdje = await this.grozdjeRepository.findOne({where:{idGrozdja:grozdjeDTO.idGrozdja}});
    sira.grozdje = grozdje;
    sira.proizvodniList = savedProizvodniList;
    sira.idGrozdja = grozdje.idGrozdja;
    sira.idPListaA = savedProizvodniList.idPLista;
    this.siraRepostitory.save(sira);
    return savedProizvodniList;
  }

  findAll():Promise<ProizvodniList[]> {
    return this.proizvodniListRepository.find({relations:['enolog','stavkeProizvodnogLista','stavkeProizvodnogLista.enoloskiAditiv','sira','sira.grozdje','stavkaGodisnjiPlan.vino']});
  }

  findOne(id: number):Promise<ProizvodniList> {
    return this.proizvodniListRepository.findOne({where:{idPLista:id}, relations:['enolog','stavkeProizvodnogLista','stavkeProizvodnogLista.enoloskiAditiv','sira','sira.grozdje','stavkaGodisnjiPlan.vino']});
  }

  async remove(id: number) {
    const result = await this.proizvodniListRepository.delete(id);
    if (result.affected === 0) {
     throw new Error(`GodisnjiPlan sa ID-jem ${id} nije pronađen`);
   }
  }
  
//   async update(updateProizvodniListDto: UpdateProizvodniListDto): Promise<ProizvodniList> {
//     const zaduzeniEnolog = await this.enologRepository.findOne({ where: { IDEnologa: updateProizvodniListDto.idEnologa } });
//     if (!zaduzeniEnolog) {
//         throw new Error(`Enolog sa ID-jem ${updateProizvodniListDto.idEnologa} nije pronađen!`);
//     }

//     const proizvodniList = await this.proizvodniListRepository.findOne({
//         where: { idPLista: updateProizvodniListDto.idPLista },
        
//     }); 
//     if (!proizvodniList) {
//         throw new Error(`Proizvodni list sa ID-jem ${updateProizvodniListDto.idPLista} nije pronađen!`);
//     }

//     proizvodniList.enolog = zaduzeniEnolog;
//     proizvodniList.datumPoslednjeIzmene = updateProizvodniListDto.datumPoslednjeIzmene;  
//     proizvodniList.opisINapomene = updateProizvodniListDto.opisINapomene;

//     for (const stavka of updateProizvodniListDto.stavke) {
//         const staraStavka = await this.StavkaProizvodnogListaRepository.findOne({
//             where: {
//                 idPLista: stavka.idPLista,
//                 redniBrojStavkeProizvodnogLista: stavka.redniBrojStavkeProizvodnogLista
//             }
//         });

//         if (staraStavka) {
//             staraStavka.kolicina = stavka.kolicina;
//             await this.StavkaProizvodnogListaRepository.save(staraStavka);
//         } else {
//             throw new Error(`Stavka sa ID-jem ${stavka.idPLista} i rednim brojem ${stavka.redniBrojStavkeProizvodnogLista} nije pronađena!`);
//         }
//     }

  
    

//     console.log(proizvodniList.idPLista);
//     return await this.proizvodniListRepository.save(proizvodniList);
// }



  

}
