import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { EnoloskiAditiv } from "./EnoloskiAditiv";
import { StavkaGodisnjegPlana } from "./StavkaGodisnjegPlana";

@Entity()
export class Repromaterijal {
  
  @PrimaryColumn()
  idRepromaterijala: number;
  @PrimaryColumn()
  idGodisnjegPlanaFKS:number;
  @PrimaryColumn()
  idStavkePlana:number;
 
  @JoinColumn([{name:"idGodisnjegPlanaFKS",referencedColumnName:"idGodisnjegPlanaFK",foreignKeyConstraintName:"reproKaStavki"},
    {name:"idStavkePlana",referencedColumnName:"redniBrStavke",foreignKeyConstraintName:"reproKaStavki1"},
  ])
  @ManyToOne(() => StavkaGodisnjegPlana, stavka => stavka.repromaterijali,
{
  onDelete:'CASCADE',
  onUpdate:'CASCADE'
})
  stavka: StavkaGodisnjegPlana;
  
 
  
  
  @Column({nullable:false,default:0})
  kolicina: number;
  

  @ManyToOne(() => EnoloskiAditiv, aditiv => aditiv.repromaterijali)
  enoloskiAditiv: EnoloskiAditiv;
}