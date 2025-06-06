import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zaposleni } from './entities/Zaposleni';
import { ZaposleniModule } from './zaposleni/zaposleni.module';
import { AuthModule } from './auth/auth.module';
import { Rola } from './entities/Rola';
import { RacunovodjaVinarije } from './entities/RacunovodjaVinarije';
import { SefProizvodnje } from './entities/SefProizvodnje';
import { Enolog } from './entities/Enolog';
import {  Reflector } from '@nestjs/core';



import { EnoloskiAditiv } from './entities/EnoloskiAditiv';
import { GodisnjiPlan } from './entities/GodisnjiPlan';
import { Grozdje } from './entities/Grozdje';
import { KolicineRepromaterijala } from './entities/KolcineRepromaterijala';
import { Kupac } from './entities/Kupac';
import { PredracunTroskova } from './entities/PredracunTroskova';
import { ProizvodniList } from './entities/ProizvodniList';
import { Repromaterijal } from './entities/Repromaterijal';
import { RezervisaneKolicine } from './entities/RezervisaneKolcine';
import { Sira } from './entities/Sira';
import { StavkaGodisnjegPlana } from './entities/StavkaGodisnjegPlana';
import { StavkaPredracuna } from './entities/StavkaPredracuna';
import { Vino } from './entities/Vino';
import { JedinicaMere } from './entities/JedinicaMere';
import { TipPakovanja } from './entities/TipPakovanja';
import { StavkaProizvodnogLista } from './entities/StavkaProizvodnogLista';
import { TipVina } from './entities/TipVina';
import { VrstaGrozdja } from './entities/VrstaGrozdja';
import { VrstaPredracuna } from './entities/VrstaPredracuna';
import { GodisnjiPlanModule } from './godisnji-plan/godisnji-plan.module';
import { ProizvodniListModule } from './proizvodni-list/proizvodni-list.module';
import { PredracunTroskovaModule } from './predracun-troskova/predracun-troskova.module';
import { RezervisaneKolicineModule } from './rezervisane-kolicine/rezervisane-kolicine.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'baza_diplomski',
    entities: [GodisnjiPlan,StavkaGodisnjegPlana,Vino,TipVina,TipPakovanja,JedinicaMere,Repromaterijal,EnoloskiAditiv,KolicineRepromaterijala,
      SefProizvodnje, RezervisaneKolicine,Kupac,Zaposleni,Rola,Enolog,ProizvodniList,StavkaProizvodnogLista,Sira,Grozdje,VrstaGrozdja,PredracunTroskova,StavkaPredracuna,VrstaPredracuna,RacunovodjaVinarije
    ],
    synchronize: true,
    logging:true,
    logger:"advanced-console"
  }), ZaposleniModule, AuthModule, GodisnjiPlanModule,GodisnjiPlanModule, ProizvodniListModule, PredracunTroskovaModule, RezervisaneKolicineModule],


  controllers: [AppController],
  providers: [AppService,Reflector],
})
export class AppModule {}
