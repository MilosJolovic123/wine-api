import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { GodisnjiPlan } from "./GodisnjiPlan";
import { Vino } from "./Vino";
import { Repromaterijal } from "./Repromaterijal";
import { RezervisaneKolicine } from "./RezervisaneKolcine";
import { ProizvodniList } from "./ProizvodniList";

@Entity()
@Unique(['idGodisnjegPlanaFK', 'redniBrStavke'])
export class StavkaGodisnjegPlana {
  
  @PrimaryColumn()
  redniBrStavke: number;
  
  @PrimaryColumn()
  idGodisnjegPlanaFK:number;
 
  @JoinColumn({name:"idGodisnjegPlanaFK",foreignKeyConstraintName:"stavkaKaPlanu"})
  @ManyToOne(() => GodisnjiPlan, plan => plan.stavke,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  })
  godisnjiPlan: GodisnjiPlan;
  
  @Column({nullable:false,default:''})
  opisIDodatneNapomene: string;
  
  @Column({nullable:false,default:0})
  kolicina: number;
  
  @Column({nullable:false,default:0})
  preostalaKolicina:number;

  @ManyToOne(() => Vino, vino => vino.stavke)
  vino: Vino;
  
  @OneToMany(() => Repromaterijal, repromaterijal => repromaterijal.stavka)
  repromaterijali: Repromaterijal[];

  @OneToMany(()=>RezervisaneKolicine,rezervisaneKolicine=>rezervisaneKolicine.stavka)
  rezervisaneKolicine:RezervisaneKolicine[];

  @OneToMany(()=>ProizvodniList,proizvodniListovi=>proizvodniListovi.stavkaGodisnjiPlan)
  proizvodniListovi:ProizvodniList[];
}