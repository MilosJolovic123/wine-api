import { RezervisaneKolicine } from './RezervisaneKolcine';
import { Rola } from './Rola';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'zaposleni'})
export class Zaposleni{
    @PrimaryGeneratedColumn()
    idZaposlenogKomercijaliste: number;
    @Column({nullable:false,default:''})
    imePrezime: string;
    @Column({unique:true})
    mejl: string;
    @Column({nullable:false,default:''})
    password: string;
    @Column({nullable:false,default:''})
    brojTelefona: string;
    @ManyToOne(()=>Rola,(rola)=>rola.zaposleni)
    rola: Rola;
    @OneToMany(()=>RezervisaneKolicine,rezervisaneKolcine=>rezervisaneKolcine.zaposleniKomercijalista)
    rezervisaneKolicine:RezervisaneKolicine[];
    

}
