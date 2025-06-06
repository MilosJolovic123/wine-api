import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StavkaGodisnjegPlana } from "./StavkaGodisnjegPlana";
import { TipVina } from "./TipVina";
import { TipPakovanja } from "./TipPakovanja";

@Entity()
export class Vino {
  @PrimaryGeneratedColumn()
  idVina: number;

  @Column({nullable:false,default:''})
  nazivVina: string;

  @Column({nullable:false,default:0})
  procenatAlkohola: number;

  @Column({nullable:false,default:0})
  godinaBerbe: number;

  @ManyToOne(() => TipVina, tip => tip.vina)
  //@JoinColumn({ name: 'idTipa' })
  tipVina: TipVina;


  
  @OneToMany(() => StavkaGodisnjegPlana, stavka => stavka.vino)
  // @JoinColumn([
  //   { name: 'redniBrStavke', referencedColumnName: 'redniBrStavke',foreignKeyConstraintName: "vino_ka_stavci" },
  //   { name: 'idGodisnjegPlana', referencedColumnName: 'idGodisnjegPlana',foreignKeyConstraintName: "vino_ka_stavci1" }
  //  ])
  stavke: StavkaGodisnjegPlana[];

  @ManyToOne(()=> TipPakovanja,pakovanje=>pakovanje.vina)
    pakovanje:TipPakovanja;
}