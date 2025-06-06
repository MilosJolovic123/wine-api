import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Vino } from "./Vino";
import { TipPakovanja } from "./TipPakovanja";
@Entity()
export class TipVina {
    @PrimaryGeneratedColumn()
    idTipaVina: number;
  
    @Column({nullable:false,default:''})
    nazivTipa: string;
  
    @OneToMany(() => Vino, vino => vino.tipVina)
    vina: Vino[];

    
  }