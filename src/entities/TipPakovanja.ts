import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JedinicaMere } from "./JedinicaMere";
import { Vino } from "./Vino";

@Entity()
export class TipPakovanja {
  @PrimaryGeneratedColumn()
  idPakovanja: number;

  @Column({type:"double",nullable:false,default:0})
  zapremina: number;

  @ManyToOne(() => JedinicaMere, jedinica => jedinica.tipoviPakovanja)
 // @JoinColumn({ name: 'idJediniceMere' })
  jedinicaMere: JedinicaMere;

  @OneToMany(()=>Vino,vina=>vina.pakovanje)
  vina:Vino[];

}