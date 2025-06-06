import { JwtService } from '@nestjs/jwt';
import { ZaposleniService } from './../../../zaposleni/services/zaposleni/zaposleni.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Zaposleni } from 'src/entities/Zaposleni';
import { Enolog } from 'src/entities/Enolog';
import { SefProizvodnje } from 'src/entities/SefProizvodnje';
import { RacunovodjaVinarije } from 'src/entities/RacunovodjaVinarije';
import { Response } from 'express';
@Injectable()
export class AuthService {
    constructor(private zaposleniService: ZaposleniService, private jwtService: JwtService ){}

    async fetchUserByEmail(email: string) {
        let user:Zaposleni|Enolog|SefProizvodnje|RacunovodjaVinarije; 
        user = await this.zaposleniService.fetchZaposleni(email);
        if (!user) {
            user = await this.zaposleniService.fetchEnolog(email);
        }
        if (!user) {
            user = await this.zaposleniService.fetchSefProizvodnje(email);
        }
        if (!user) {
            user = await this.zaposleniService.fetchRacunovodjaVinarije(email);
        }
        return user;
    }

    


    async signIn(email:string, pass: string, res:Response):Promise<void>{
        const user = await this.fetchUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Korisnik nije pronađen!');
        }
            
        const isPasswordMatching = await bcrypt.compare(pass, user.password);
        if (!isPasswordMatching) {
          throw new UnauthorizedException('Pogrešna korisnička šifra!');
        }
        
        const payload = {email: user.mejl, role: user.rola.naziv};
        const access_token = await this.jwtService.signAsync(payload)
        res.send({message:'Uspešna prijava na sistem!',jwt:access_token});
    }
}
        
       
        




