import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { StavkaGodisnjegPlana } from './StavkaGodisnjegPlana';
import { Repromaterijal } from './Repromaterijal';
import { KolicineRepromaterijala } from './KolcineRepromaterijala';
import { ProizvodniList } from './ProizvodniList';
import { PredracunTroskova } from './PredracunTroskova';
import { SefProizvodnje } from './SefProizvodnje';

// GodišnjiPlan
@Entity()
export class GodisnjiPlan {
  @PrimaryGeneratedColumn()
  idGodisnjegPlana: number;

  @Column({nullable:false})
  datumPocetkaRealizacije: Date;

  @Column({nullable:false})
  datumZavrsetkaRealizacije: Date;

  @Column({nullable:false,default:''})
  opisIDodatneNapomene: string;

  @Column({nullable:false,default:false})
  zavrsen: boolean;

  @Column({nullable:false,default:false})
  aktivan: boolean;
  
  @OneToMany(() => StavkaGodisnjegPlana, stavka => stavka.godisnjiPlan)
  stavke: StavkaGodisnjegPlana[];


  @OneToMany(() => KolicineRepromaterijala, kolicine => kolicine.godisnjiPlan)
  kolicineRepromaterijala: KolicineRepromaterijala[];

  @OneToMany(() => PredracunTroskova, predracun => predracun.godisnjiPlan)
  predracun: PredracunTroskova[];

  @ManyToOne(()=>SefProizvodnje,sefProizvodnje=>sefProizvodnje.godisnjiPlanovi)
  sefProizvodnje:SefProizvodnje;
  //godisnjiPlan: Promise<SefProizvodnje>;



}