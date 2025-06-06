import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rola } from "./Rola";
import { PredracunTroskova } from "./PredracunTroskova";
@Entity()
export class RacunovodjaVinarije{
    @PrimaryGeneratedColumn()
    IDRacunovodje: number;
    @Column({nullable:false,default:''})
    imePrezime: string;
    @Column({unique:true,nullable:false,default:''})
    mejl: string;
    @Column({nullable:false,default:''})
    password: string;
    @Column({nullable:false,default:''})
    brojTelefona: string;
    @ManyToOne(()=>Rola,(rola)=>rola.racunovodja)
    rola:Rola;
    @OneToMany(()=>PredracunTroskova,predracuni=>predracuni.racunovodja)
    predracuni:PredracunTroskova[];
}