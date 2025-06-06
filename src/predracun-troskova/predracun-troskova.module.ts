import { Module } from '@nestjs/common';
import { PredracunTroskovaService } from './services/predracun-troskova.service';
import { PredracunTroskovaController } from './controllers/predracun-troskova.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GodisnjiPlan } from 'src/entities/GodisnjiPlan';
import { PredracunTroskova } from 'src/entities/PredracunTroskova';
import { StavkaPredracuna } from 'src/entities/StavkaPredracuna';
import { VrstaPredracuna } from 'src/entities/VrstaPredracuna';
import { Rola } from 'src/entities/Rola';
import { RacunovodjaVinarije } from 'src/entities/RacunovodjaVinarije';
import { EnoloskiAditiv } from 'src/entities/EnoloskiAditiv';

@Module({
  controllers: [PredracunTroskovaController],
  providers: [PredracunTroskovaService],
  imports:[TypeOrmModule.forFeature([GodisnjiPlan
    ,PredracunTroskova,StavkaPredracuna,VrstaPredracuna,Rola,RacunovodjaVinarije,EnoloskiAditiv
  ])]
})
export class PredracunTroskovaModule {}
