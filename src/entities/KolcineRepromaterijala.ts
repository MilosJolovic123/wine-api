import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GodisnjiPlan } from "./GodisnjiPlan";
import { EnoloskiAditiv } from "./EnoloskiAditiv";

@Entity()
export class KolicineRepromaterijala {
  @PrimaryGeneratedColumn()
  idKolicina: number;

  @Column({nullable:false,default:0})
  planiranaKolicina: number;

  @Column({nullable:false,default:0})
  potrosenaKolicina: number;

  @Column({nullable:false,default:0})
  proknjizenaKolicina: number;

  @ManyToOne(() => GodisnjiPlan, plan => plan.kolicineRepromaterijala,
{
  onDelete:'CASCADE',
  onUpdate:'CASCADE'
})
 // @JoinColumn({ name: 'idGodisnjegPlana' })
  godisnjiPlan: GodisnjiPlan;

  @ManyToOne(() => EnoloskiAditiv, aditiv => aditiv.kolicineRepromaterijala)
 // @JoinColumn({ name: 'idEnoloskogAditiva' })
  enoloskiAditiv: EnoloskiAditiv;
}