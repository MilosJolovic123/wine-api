import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JedinicaMere } from "./JedinicaMere";
import { Repromaterijal } from "./Repromaterijal";
import { KolicineRepromaterijala } from "./KolcineRepromaterijala";
import { StavkaPredracuna } from "./StavkaPredracuna";
import { StavkaProizvodnogLista } from "./StavkaProizvodnogLista";

@Entity()
export class EnoloskiAditiv {
  @PrimaryGeneratedColumn()
  idEnoloskogAditiva: number;

  @Column({default:''})
  naziv: string;

  @Column({default:''})
  opis: string;

  @Column({type:"double",nullable:false,default:0})
  cenaPoJediniciMere: number;

  @ManyToOne(() => JedinicaMere, jedinica => jedinica.enoloskiAditivi)
  //@JoinColumn({ name: 'idJediniceMere' })
  jedinicaMere: JedinicaMere;

  @OneToMany(() => Repromaterijal, repromaterijal => repromaterijal.enoloskiAditiv)
  repromaterijali: Repromaterijal[];

  @OneToMany(()=>KolicineRepromaterijala,kolicineRepromaterijala=>kolicineRepromaterijala.enoloskiAditiv)
  kolicineRepromaterijala:KolicineRepromaterijala[];

  
  @OneToMany(()=>StavkaPredracuna,stavkePredracuna=>stavkePredracuna.enoloskiAditiv)
  stavkePredracuna:StavkaPredracuna[];

  @OneToMany(()=>StavkaProizvodnogLista,stavkePLista=>stavkePLista.enoloskiAditiv)
  stavkePLista:StavkaProizvodnogLista[];

}