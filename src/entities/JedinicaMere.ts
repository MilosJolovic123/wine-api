import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipPakovanja } from "./TipPakovanja";
import { EnoloskiAditiv } from "./EnoloskiAditiv";

@Entity()
export class JedinicaMere {
  @PrimaryGeneratedColumn()
  idJediniceMere: number;

  @Column({nullable:false,default:''})
  nazivJediniceMere: string;

  @OneToMany(() => TipPakovanja, tipPakovanja => tipPakovanja.jedinicaMere)
  tipoviPakovanja: TipPakovanja[];

  @OneToMany(() => EnoloskiAditiv, aditiv => aditiv.jedinicaMere)
  enoloskiAditivi: EnoloskiAditiv[];
}