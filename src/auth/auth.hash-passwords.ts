import * as bcrypt from 'bcrypt';
import {writeFileSync} from 'fs';
import { ZaposleniSignInDto } from 'src/zaposleni/dtos/ZaposleniSignInDto';

const zaposleni:ZaposleniSignInDto[] =[
    {email: 'marko.markovic@vinarija.rs',password:'marko'},
    {email: 'petar.petrovic@vinarija.rs',password:'petar'},
    {email: 'pavle.pavlovic@vinarija.rs',password:'pavle'},
    {email: 'marija.marijanovic@vinarija.rs,',password:'marija'},
    {email: 'mihajlo.mihajlovic@vinarija.rs',password: 'mihajlo'},
    {email: 'mina.minic@vinarija.rs',password:'mina'}
];

async function hashPasswords(){
    const saltRounds = 10;
    const hashedUsers:{email:string; hashedPassword:string}[]=[];

    for(const zaposlen of zaposleni){
        const hashedPassword = await bcrypt.hash(zaposlen.password,saltRounds);
        hashedUsers.push({email: zaposlen.email,hashedPassword});
    }
    generateSQL(hashedUsers);
}

function generateSQL(hashedUsers: { email: string; hashedPassword: string }[]) {
    let sql = '';
  
    
      sql += `INSERT INTO zaposleni (imePrezime, mejl, password, brojTelefona,rolaIDRole) VALUES ('Marko Markovic','${hashedUsers[0].email}', '${hashedUsers[0].hashedPassword}', '+381641234567',1);\n`;
      sql += `INSERT INTO zaposleni (imePrezime, mejl, password, brojTelefona,rolaIDRole) VALUES ('Petar Petrovic','${hashedUsers[1].email}', '${hashedUsers[1].hashedPassword}', '+381641234568',1);\n`;
      sql += `INSERT INTO zaposleni (imePrezime, mejl, password, brojTelefona,rolaIDRole) VALUES ('Pavle Pavlovic','${hashedUsers[2].email}', '${hashedUsers[2].hashedPassword}', '+381641234569',2);\n`;
      sql += `INSERT INTO zaposleni (imePrezime, mejl, password, brojTelefona,rolaIDRole) VALUES ('Marija Marijanovic','${hashedUsers[3].email}', '${hashedUsers[3].hashedPassword}', '+381641234570',3);\n`;
      sql += `INSERT INTO zaposleni (imePrezime, mejl, password, brojTelefona,rolaIDRole) VALUES ('Mihajlo Mihajlovic','${hashedUsers[4].email}', '${hashedUsers[4].hashedPassword}', '+381641234571',3);\n`;
      sql += `INSERT INTO zaposleni (imePrezime, mejl, password, brojTelefona.rolaIDRole) VALUES ('Mina Minic','${hashedUsers[5].email}', '${hashedUsers[5].hashedPassword}', '+381641234523',1);\n`;
    
  
    writeFileSync('insert_users.sql', sql);
    console.log('SQL upit je generisan i sačuvan u fajlu insert_users.sql.');
  }
  
  hashPasswords().catch(error => console.error(error));
