import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PredracunTroskova } from "./PredracunTroskova";

@Entity()
export class VrstaPredracuna {
  @PrimaryGeneratedColumn()
  idVrstePredracuna: number;

  @Column({nullable:false,default:''})
  nazivVrstePredracuna: string;

  @OneToMany(()=>PredracunTroskova,predracun=>predracun.vrstaPredracuna)
  predracun:PredracunTroskova[];
}