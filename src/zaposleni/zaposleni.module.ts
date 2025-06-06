import { Module } from '@nestjs/common';
import { ZaposleniController } from './controllers/zaposleni/zaposleni.controller';
import { ZaposleniService } from './services/zaposleni/zaposleni.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zaposleni } from 'src/entities/Zaposleni';
import { ZaposleniSignInDto } from './dtos/ZaposleniSignInDto';
import { SefProizvodnje } from 'src/entities/SefProizvodnje';
import { Rola } from 'src/entities/Rola';
import { RacunovodjaVinarije } from 'src/entities/RacunovodjaVinarije';
import { Enolog } from 'src/entities/Enolog';

@Module({
  exports: [ZaposleniService,ZaposleniSignInDto],
  imports: [TypeOrmModule.forFeature([Zaposleni,SefProizvodnje,Rola,RacunovodjaVinarije,Enolog])],
  controllers: [ZaposleniController],
  providers: [ZaposleniService,ZaposleniSignInDto]
})
export class ZaposleniModule {}
