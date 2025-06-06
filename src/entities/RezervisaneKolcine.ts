import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Zaposleni } from "./Zaposleni";
import { Kupac } from "./Kupac";
import { StavkaGodisnjegPlana } from "./StavkaGodisnjegPlana";

@Entity()
export class RezervisaneKolicine {
  @PrimaryGeneratedColumn()
  idRezervacije: number;

  @Column({nullable:false})
  datumRezervacije: Date;

  @Column({nullable:false})
  kolicinaZaRezervaciju:number;

  @ManyToOne(() => Zaposleni, zaposleni => zaposleni.rezervisaneKolicine)
 // @JoinColumn({ name: 'idZaposlenogKomercijaliste' })
  zaposleniKomercijalista: Zaposleni;

  @ManyToOne(() => Kupac, kupac => kupac.rezervisaneKolicine)
  //@JoinColumn({ name: 'PIB' })
  kupac: Kupac;
  @ManyToOne(()=>StavkaGodisnjegPlana,stavka=>stavka.rezervisaneKolicine,
{
  onDelete:'CASCADE',
  onUpdate:'CASCADE'
})
  @JoinColumn([{referencedColumnName:"redniBrStavke"},{referencedColumnName:"idGodisnjegPlanaFK"}])
  stavka:StavkaGodisnjegPlana;
}