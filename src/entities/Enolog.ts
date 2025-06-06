import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rola } from "./Rola";
import { ProizvodniList } from "./ProizvodniList";
@Entity()
export class Enolog{
    
    @PrimaryGeneratedColumn()
    IDEnologa: number;
    @Column({nullable:false,default:''})
    imePrezime: string;
    @Column({unique:true,nullable:false,default:''})
    mejl: string;
    @Column({nullable:false,default:''})
    password: string;
    @Column({nullable:false,default:''})
    brojTelefona: string;
    @ManyToOne(()=>Rola, (rola)=>rola.enolog,{nullable:false})
    rola:Rola;
    @OneToMany(() => ProizvodniList, proizvodniList => proizvodniList.enolog)
    proizvodniListovi: ProizvodniList[];
}
