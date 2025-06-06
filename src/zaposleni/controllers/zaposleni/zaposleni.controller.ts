import { Body, Controller, Get, Post } from '@nestjs/common';
import { ZaposleniSignInDto } from 'src/zaposleni/dtos/ZaposleniSignInDto';
import { ZaposleniService } from 'src/zaposleni/services/zaposleni/zaposleni.service';

@Controller('zaposleni')
export class ZaposleniController {


    constructor(private zaposleniService:ZaposleniService){}

    //basic info o logovanom korisniku kad napravimo sesiju
    @Get('vratiZaposlenog')
    getZaposleni(@Body() signInDto: ZaposleniSignInDto){
        this.zaposleniService.fetchZaposleni(signInDto.email);
    }
}
