import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const cookieParser = require('cookie-parser');
  const fs = require('fs');
  // const https = require('https');
  //   const httpsOptions = {
  //    key: fs.readFileSync('C:/.vinarija/diplomski/localhost.key'),
  //    cert: fs.readFileSync('C:/.vinarija/diplomski/localhost.crt'),
  //  };
 //const app = await NestFactory.create(AppModule,{httpsOptions});
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:'http://localhost:3001',
    credentials: true,
    
  });
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();


