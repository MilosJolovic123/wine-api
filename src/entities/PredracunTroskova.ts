import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GodisnjiPlan } from "./GodisnjiPlan";
import { RacunovodjaVinarije } from "./RacunovodjaVinarije";
import { StavkaPredracuna } from "./StavkaPredracuna";
import { VrstaPredracuna } from "./VrstaPredracuna";

@Entity()
export class PredracunTroskova {
  @PrimaryGeneratedColumn()
  idPredracuna: number;

  @Column({nullable:false,default:''})
  napomene: string;

  @Column({nullable:false})
  datumIzdavanja: Date;

  @Column({nullable:false,default:''})
  uzrokPrekoracenja: string;

  @Column({type:"double",nullable:false,default:0})
  ukupnaCena: number;

  @ManyToOne(() => GodisnjiPlan, plan => plan.predracun,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  })
//  @JoinColumn({ name: 'idGodisnjegPlana' })
  godisnjiPlan: GodisnjiPlan;

  @ManyToOne(() => RacunovodjaVinarije, racunovodja => racunovodja.predracuni)
//  @JoinColumn({ name: 'IDRacunovodje' })
  racunovodja: RacunovodjaVinarije;
  
  @ManyToOne(()=>VrstaPredracuna, vrstaPredracuna=>vrstaPredracuna.predracun)
  vrstaPredracuna:VrstaPredracuna;

  @OneToMany(() => StavkaPredracuna, stavka => stavka.predracun)
  stavkePredracuna: StavkaPredracuna[];
  
  @ManyToOne(() => PredracunTroskova, predracun => predracun.dodatniPredracuni, { nullable: true ,onDelete:'CASCADE',onUpdate:'CASCADE'})
  osnovniPredracun: PredracunTroskova;

  @OneToMany(() => PredracunTroskova, predracun => predracun.osnovniPredracun)
  dodatniPredracuni: PredracunTroskova[];
}