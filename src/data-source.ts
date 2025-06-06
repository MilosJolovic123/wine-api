// import { DataSource } from 'typeorm';
// import { Zaposleni, Rola, SefProizvodnje, Enolog, Vino, JedinicaMere, TipPakovanja, EnoloskiAditiv, GodisnjiPlan, Grozdje, KolicineRepromaterijala, Kupac, PredracunTroskova, ProizvodniList, RacunovodjaVinarije, Repromaterijal, RezervisaneKolicine, Sira, StavkaGodisnjegPlana, StavkaPredracuna, StavkaProizvodnogLista, TipVina, VrstaGrozdja, VrstaPredracuna } from './entities';

// export const AppDataSource = new DataSource({
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'admin',
//   database: 'baza_diplomski',
//   entities: [Zaposleni, Rola, RacunovodjaVinarije, SefProizvodnje, Enolog, Vino, JedinicaMere, TipPakovanja, EnoloskiAditiv, GodisnjiPlan, Grozdje, KolicineRepromaterijala, Kupac, PredracunTroskova, ProizvodniList, RacunovodjaVinarije, Repromaterijal, RezervisaneKolicine, Sira, StavkaGodisnjegPlana, StavkaPredracuna, StavkaProizvodnogLista, TipVina, VrstaGrozdja, VrstaPredracuna],
//   synchronize: false,
// });