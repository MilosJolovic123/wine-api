import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GodisnjiPlan } from "./GodisnjiPlan";
import { Enolog } from "./Enolog";
import { StavkaProizvodnogLista } from "./StavkaProizvodnogLista";
import { Sira } from "./Sira";
import { StavkaGodisnjegPlana } from "./StavkaGodisnjegPlana";

@Entity()
export class ProizvodniList {
  @PrimaryGeneratedColumn()
  idPLista: number;

  @Column({nullable:false,default:''})
  opisINapomene: string;

  @Column({nullable:false})
  datumPrvogIzdavanja: Date;

  @Column()
  datumPoslednjeIzmene:Date;

  @ManyToOne(() => Enolog, enolog => enolog.proizvodniListovi)
 // @JoinColumn({ name: 'IDEnologa' })
  enolog: Enolog;

  @OneToMany(() => StavkaProizvodnogLista, stavka => stavka.proizvodniList)
  stavkeProizvodnogLista: StavkaProizvodnogLista[];

  @OneToMany(() => Sira, sira => sira.proizvodniList)
  sira: Sira[];
  @ManyToOne(()=>StavkaGodisnjegPlana,stavkaGodisnjiPlan=>stavkaGodisnjiPlan.proizvodniListovi,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  })
  @JoinColumn([{referencedColumnName:"redniBrStavke"},{referencedColumnName:"idGodisnjegPlanaFK"}])
  stavkaGodisnjiPlan:StavkaGodisnjegPlana;
}