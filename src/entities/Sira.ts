import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ProizvodniList } from "./ProizvodniList";
import { Grozdje } from "./Grozdje";

@Entity()
export class Sira {
  @PrimaryColumn()
  idPListaA:number;
  @PrimaryColumn()
  idGrozdja:number;

  @Column({nullable:false,default:0})
  koncentracijaSecera: number;

  @Column({nullable:false,default:0})
  nivoKiselina: number;

  @Column({nullable:false,default:0})
  kolicina: number;

  @ManyToOne(() => ProizvodniList, proizvodniList => proizvodniList.sira,
  {
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  }
)
  @JoinColumn({ name: 'idPListaA',referencedColumnName:"idPLista" })
    
  proizvodniList: ProizvodniList;

  @ManyToOne(() => Grozdje, grozdje => grozdje.sire)
  @JoinColumn({ name: 'idGrozdja',referencedColumnName:"idGrozdja" })
    
  grozdje: Grozdje;
}
