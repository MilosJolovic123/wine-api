import { CreateRezervisaneKolicineDto } from './../dto/create-rezervisane-kolicine.dto';
import { Injectable } from '@nestjs/common';
import { UpdateRezervisaneKolicineDto } from '../dto/update-rezervisane-kolicine.dto';
import { RezervisaneKolicine } from 'src/entities/RezervisaneKolcine';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zaposleni } from 'src/entities/Zaposleni';
import { Kupac } from 'src/entities/Kupac';
import { StavkaGodisnjegPlana } from 'src/entities/StavkaGodisnjegPlana';
import { Vino } from 'src/entities/Vino';
import { Rola } from 'src/entities/Rola';

@Injectable()
export class RezervisaneKolicineService {

  constructor(
    @InjectRepository(RezervisaneKolicine)  private rezKolRepository:Repository<RezervisaneKolicine>,
    @InjectRepository(Zaposleni) private zaposleniRepository:Repository<Zaposleni>,
    @InjectRepository(Kupac) private kupacRepository:Repository<Kupac>,
    @InjectRepository(StavkaGodisnjegPlana) private stavkaRepository:Repository<StavkaGodisnjegPlana>,
    @InjectRepository(Vino) private vinoRepository:Repository<Vino>,
    @InjectRepository(Rola) private rolaRepository:Repository<Rola>
  ){}

  async getKupci():Promise<Kupac[]>{
    return await this.kupacRepository.find();
  }

  async create(createRezervisaneKolicineDto: CreateRezervisaneKolicineDto):Promise<RezervisaneKolicine> {
    
    const kreiranaRezervacija = await this.rezKolRepository.create(createRezervisaneKolicineDto);
  
    const zaduzeniKomercijalista = await this.zaposleniRepository.findOne({where:{mejl:createRezervisaneKolicineDto.mejlKomercijaliste}});
    if(!zaduzeniKomercijalista){
      throw new Error(`Komercijalista vinarije sa ID-jem ${createRezervisaneKolicineDto.mejlKomercijaliste} nije pronađen!`);
    }
     
    const kupacRezervacije = await this.kupacRepository.findOne({where:{PIB:createRezervisaneKolicineDto.PIB}});

    if(!kupacRezervacije){
      throw new Error(`Kupac sa PIB-om ${createRezervisaneKolicineDto.PIB} nije pronađen!`);
    }
    
    const stavkaPlana = await this.stavkaRepository.findOne({where:{idGodisnjegPlanaFK:createRezervisaneKolicineDto.idGodisnjegPlanaFK,redniBrStavke:createRezervisaneKolicineDto.redniBrStavke}});
    if(!stavkaPlana){
      throw new Error(`Stavka sa ID-jem ${createRezervisaneKolicineDto.redniBrStavke} nije pronađena!`);
    }
     
    kreiranaRezervacija.datumRezervacije = new Date();
    kreiranaRezervacija.kupac = kupacRezervacije;
    kreiranaRezervacija.stavka = stavkaPlana;
    kreiranaRezervacija.zaposleniKomercijalista = zaduzeniKomercijalista;

    if(kreiranaRezervacija.kolicinaZaRezervaciju>kreiranaRezervacija.stavka.kolicina){
      throw new Error(`Količina izabrana za rezervaciju je veća od količine planirane za proizvodnju`);

    }

    if(kreiranaRezervacija.kolicinaZaRezervaciju>kreiranaRezervacija.stavka.preostalaKolicina){
      throw new Error(`Količina izabrana za rezervaciju je veća od preostale količine planirane za proizvodnju`);
    }

    kreiranaRezervacija.stavka.preostalaKolicina-=kreiranaRezervacija.kolicinaZaRezervaciju;
    this.stavkaRepository.save(kreiranaRezervacija.stavka);

    const sacuvanaRezervacija = this.rezKolRepository.save(kreiranaRezervacija);
    return sacuvanaRezervacija;
  }
  
    
    

  async findAll():Promise<RezervisaneKolicine[]> {
    return await this.rezKolRepository.find({relations:['zaposleniKomercijalista','kupac','stavka','stavka.vino']});
  }

  async findOne(id: number) {
    return await this.rezKolRepository.findOne({relations:['zaposleniKomercijalista','kupac','stavka','stavka.vino'],where:{idRezervacije:id}});
  }

  async update(id,updateRezervisaneKolicineDto: UpdateRezervisaneKolicineDto):Promise<RezervisaneKolicine> {
    const zaduzeniKomercijalista = await this.zaposleniRepository.findOne({where:{mejl:updateRezervisaneKolicineDto.mejlZaposlenogKomercijaliste}});
    if(!zaduzeniKomercijalista){
      throw new Error(`Komercijalista vinarije sa ID-jem ${updateRezervisaneKolicineDto.mejlZaposlenogKomercijaliste} nije pronađen!`);
    }

    const rezervacijaZaIzmenu = await this.rezKolRepository.findOne({where:{idRezervacije:id},relations:['zaposleniKomercijalista','kupac','stavka','stavka.vino']});
    if(!rezervacijaZaIzmenu){
      throw new Error(`Data rezervacija nije pronađena!`);
    }
    

    rezervacijaZaIzmenu.zaposleniKomercijalista = zaduzeniKomercijalista;
    let sacuvanaRezervacija;
    if(updateRezervisaneKolicineDto.kolicinaZaRezervaciju == rezervacijaZaIzmenu.kolicinaZaRezervaciju){
      sacuvanaRezervacija = await this.rezKolRepository.save(rezervacijaZaIzmenu);
    }
      


    else if(updateRezervisaneKolicineDto.kolicinaZaRezervaciju < rezervacijaZaIzmenu.kolicinaZaRezervaciju){
      rezervacijaZaIzmenu.stavka.preostalaKolicina += (rezervacijaZaIzmenu.kolicinaZaRezervaciju-updateRezervisaneKolicineDto.kolicinaZaRezervaciju);
      await this.stavkaRepository.save(rezervacijaZaIzmenu.stavka); 
      rezervacijaZaIzmenu.kolicinaZaRezervaciju = updateRezervisaneKolicineDto.kolicinaZaRezervaciju;
      sacuvanaRezervacija = await this.rezKolRepository.save(rezervacijaZaIzmenu);
    }

    else if(updateRezervisaneKolicineDto.kolicinaZaRezervaciju>rezervacijaZaIzmenu.kolicinaZaRezervaciju){
      if(rezervacijaZaIzmenu.stavka.preostalaKolicina<(updateRezervisaneKolicineDto.kolicinaZaRezervaciju-rezervacijaZaIzmenu.kolicinaZaRezervaciju)){
        throw new Error(`Ne postoji data količina vina na stanju za ažuriranje rezervacije!`);
      }
      else{
        rezervacijaZaIzmenu.stavka.preostalaKolicina-=(updateRezervisaneKolicineDto.kolicinaZaRezervaciju-rezervacijaZaIzmenu.kolicinaZaRezervaciju);
        await this.stavkaRepository.save(rezervacijaZaIzmenu.stavka);
        rezervacijaZaIzmenu.kolicinaZaRezervaciju = updateRezervisaneKolicineDto.kolicinaZaRezervaciju;
        sacuvanaRezervacija = await this.rezKolRepository.save(rezervacijaZaIzmenu);
      }
    }
    return sacuvanaRezervacija;
  }

  async remove(id: number):Promise<void> {
    
    const rezZaBrisanje = await this.rezKolRepository.findOne({where:{idRezervacije:id},relations:['zaposleniKomercijalista','kupac','stavka','stavka.vino']});

    if(!rezZaBrisanje){
      throw new Error(`Rezervacija sa ID-jem ${id} nije pronađena!`);
    }
    
    rezZaBrisanje.stavka.preostalaKolicina +=rezZaBrisanje.kolicinaZaRezervaciju;
    await this.stavkaRepository.save(rezZaBrisanje.stavka);
    const result = await this.rezKolRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Rezervacija vina sa ID-jem ${id} nije pronađena`);
    }


  }
}
