import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rola } from "./Rola";
import { GodisnjiPlan } from "./GodisnjiPlan";
@Entity()
export class SefProizvodnje{
    
    @PrimaryGeneratedColumn()
    IDSefaProizvodnje: number;
    @Column({nullable:false,default:''})
    imePrezime: string;
    @Column({unique:true})
    mejl: string;
    @Column({nullable:false,default:''})
    password: string;
    @Column({nullable:false,default:''})
    brojTelefona: string;
    @ManyToOne(()=>Rola, (rola)=>rola.sefProizvodnje)
    rola:Rola;
    @OneToMany(()=>GodisnjiPlan,godisnjiPlanovi=>godisnjiPlanovi.sefProizvodnje)
    godisnjiPlanovi:GodisnjiPlan[];
}