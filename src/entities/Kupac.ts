import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { RezervisaneKolicine } from "./RezervisaneKolcine";

@Entity()
export class Kupac {
  @PrimaryColumn()
  PIB: string;

  @Column({nullable:false,default:''})
  nazivFirme: string;

  @Column({nullable:false,default:''})
  kontaktTelefon: string;

  @Column({nullable:false,default:''})
  mejlAdresa: string;

  @OneToMany(() => RezervisaneKolicine, rezervacija => rezervacija.kupac)
  rezervisaneKolicine: RezervisaneKolicine[];
}