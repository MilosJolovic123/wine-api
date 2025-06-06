import { Module } from '@nestjs/common';
import { ProizvodniListService } from './services/proizvodni-list.service';
import { ProizvodniListController } from './controllers/proizvodni-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProizvodniList } from 'src/entities/ProizvodniList';
import { StavkaProizvodnogLista } from 'src/entities/StavkaProizvodnogLista';
import { Sira } from 'src/entities/Sira';
import { Grozdje } from 'src/entities/Grozdje';
import { VrstaGrozdja } from 'src/entities/VrstaGrozdja';
import { Enolog } from 'src/entities/Enolog';
import { EnoloskiAditiv } from 'src/entities/EnoloskiAditiv';
import { GodisnjiPlan } from 'src/entities/GodisnjiPlan';
import { StavkaGodisnjegPlana } from 'src/entities/StavkaGodisnjegPlana';

@Module({
  controllers: [ProizvodniListController],
  providers: [ProizvodniListService],
  imports:[TypeOrmModule.forFeature([ProizvodniList,StavkaProizvodnogLista,Sira,Grozdje,VrstaGrozdja,Enolog,EnoloskiAditiv,GodisnjiPlan,StavkaGodisnjegPlana])]
})
export class ProizvodniListModule {}
