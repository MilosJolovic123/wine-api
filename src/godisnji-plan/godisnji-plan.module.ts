import { Module } from '@nestjs/common';
import { GodisnjiPlanService } from './services/godisnji-plan.service';
import { GodisnjiPlanController } from './controllers/godisnji-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GodisnjiPlan } from 'src/entities/GodisnjiPlan';
import { SefProizvodnje } from 'src/entities/SefProizvodnje';
import { CreateGodisnjiPlanDto } from './dto/create-godisnji-plan.dto';
import { StavkaGodisnjegPlana } from 'src/entities/StavkaGodisnjegPlana';
import { Vino } from 'src/entities/Vino';
import { Repromaterijal } from 'src/entities/Repromaterijal';
import { EnoloskiAditiv } from 'src/entities/EnoloskiAditiv';

@Module({
  exports:[GodisnjiPlanService,CreateGodisnjiPlanDto],
  imports:[TypeOrmModule.forFeature([GodisnjiPlan,SefProizvodnje,Vino,StavkaGodisnjegPlana,Repromaterijal,EnoloskiAditiv])],
  controllers: [GodisnjiPlanController],
  providers: [GodisnjiPlanService,CreateGodisnjiPlanDto],
})
export class GodisnjiPlanModule {}
