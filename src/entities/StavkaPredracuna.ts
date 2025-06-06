import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { PredracunTroskova } from "./PredracunTroskova";
import { EnoloskiAditiv } from "./EnoloskiAditiv";

@Entity()
@Unique(['idStavkePredracuna', 'idPredracuna'])

export class StavkaPredracuna {
  @PrimaryColumn()
  idStavkePredracuna: number;

  @PrimaryColumn()
  idPredracuna:number;
  
  @Column({nullable:false,default:0})
  kolicina: number;

  @Column({type:"double",nullable:false,default:0})
  ukupnaCena: number;

  @ManyToOne(() => PredracunTroskova, predracun => predracun.stavkePredracuna,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  })
  @JoinColumn({ name: 'idPredracuna' })
  predracun: PredracunTroskova;

  @ManyToOne(() => EnoloskiAditiv, aditiv => aditiv.stavkePredracuna,)
  //@JoinColumn({ name: 'idEnoloskogAditiva' })
  enoloskiAditiv: EnoloskiAditiv;
}