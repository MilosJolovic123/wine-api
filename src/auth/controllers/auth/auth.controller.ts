import { ZaposleniSignInDto } from 'src/zaposleni/dtos/ZaposleniSignInDto';
import { AuthService } from './../../service/auth/auth.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: ZaposleniSignInDto, @Res() res: Response) {
    await this.authService.signIn(signInDto.email, signInDto.password, res);
  }
     
    @UseGuards(AuthGuard)
    @Roles('Komercijalista','Šef proizvodnje','Računovodja vinarije','Enolog')
    @Get('profile')
    async getProfile(@Request() req) {
      return await req.user;
    }
      
    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res() res: Response) {
      return res.status(200).json({ message: 'Successfully logged out' });
    }
   
}
    

