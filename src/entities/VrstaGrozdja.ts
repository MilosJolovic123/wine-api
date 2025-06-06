import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Grozdje } from "./Grozdje";

@Entity()
export class VrstaGrozdja {
  @PrimaryGeneratedColumn()
  idVrsteGrozdja: number;

  @Column({nullable:false,default:''})
  nazivVrste: string;

  @OneToMany(() => Grozdje, grozdje => grozdje.vrstaGrozdja)
  grozdje: Grozdje[];
}