import { SefProizvodnje } from 'src/entities/SefProizvodnje';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Zaposleni } from './Zaposleni';
import { RacunovodjaVinarije } from './RacunovodjaVinarije';
import { Enolog } from './Enolog';

@Entity()
export class Rola{
    @PrimaryGeneratedColumn()
    IDRole: number;
    @Column({unique:true})
    naziv:string;
    @OneToMany(()=>Zaposleni, (zaposleni)=>zaposleni.rola)
    zaposleni: Zaposleni[];
    @OneToMany(()=>SefProizvodnje, (sefProizvodnje)=>sefProizvodnje.rola)
    sefProizvodnje: SefProizvodnje[];
    @OneToMany(()=>RacunovodjaVinarije, (racunovodja)=>racunovodja.rola)
    racunovodja: RacunovodjaVinarije[];
    @OneToMany(()=>Enolog, (enolog)=>enolog.rola)
    enolog: Enolog[];
}