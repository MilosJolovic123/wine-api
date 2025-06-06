import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { ZaposleniModule } from 'src/zaposleni/zaposleni.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ZaposleniSignInDto } from 'src/zaposleni/dtos/ZaposleniSignInDto';

@Module({
  exports:[AuthService],
  controllers: [AuthController],
  providers: [AuthService,ZaposleniSignInDto],
  imports: [ZaposleniModule,
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1d'}
    })
  ],
})
export class AuthModule {}
