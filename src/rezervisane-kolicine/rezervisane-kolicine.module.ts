import { Module } from '@nestjs/common';
import { RezervisaneKolicineService } from './services/rezervisane-kolicine.service';
import { RezervisaneKolicineController } from './controllers/rezervisane-kolicine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RezervisaneKolicine } from 'src/entities/RezervisaneKolcine';
import { Zaposleni } from 'src/entities/Zaposleni';
import { Rola } from 'src/entities/Rola';
import { StavkaGodisnjegPlana } from 'src/entities/StavkaGodisnjegPlana';
import { Vino } from 'src/entities/Vino';
import { Kupac } from 'src/entities/Kupac';

@Module({
  controllers: [RezervisaneKolicineController],
  providers: [RezervisaneKolicineService],
  imports: [TypeOrmModule.forFeature([RezervisaneKolicine,Zaposleni,Rola,StavkaGodisnjegPlana,Vino,Kupac])]
})
export class RezervisaneKolicineModule {}
