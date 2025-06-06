import { EnoloskiAditiv } from 'src/entities/EnoloskiAditiv';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ProizvodniList } from "./ProizvodniList";

@Entity()
export class StavkaProizvodnogLista {
  
  @PrimaryColumn()
  redniBrojStavkeProizvodnogLista: number;

  @PrimaryColumn()
  idPLista:number;

  @Column({nullable:false,default:0})
  kolicina: number;

  @ManyToOne(() => ProizvodniList, proizvodniList => proizvodniList.stavkeProizvodnogLista,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  })
  @JoinColumn({ name: 'idPLista' })
  proizvodniList: ProizvodniList;
  @ManyToOne(()=>EnoloskiAditiv,enoloskiAditiv=>enoloskiAditiv.stavkePLista)
  @JoinColumn({name:'idEnoloskogAditiva',foreignKeyConstraintName:'fk_spl_ka_enoloski_aditiv'})
  enoloskiAditiv:EnoloskiAditiv;
}