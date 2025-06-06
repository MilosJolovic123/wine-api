import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sira } from "./Sira";
import { VrstaGrozdja } from "./VrstaGrozdja";

@Entity()
export class Grozdje {
  @PrimaryGeneratedColumn()
  idGrozdja: number;

  @Column({nullable:false,default:''})
  nazivGrozdja: string;

  @ManyToOne(() => VrstaGrozdja, vrsta => vrsta.grozdje)
  //@JoinColumn({ name: 'idVrsteGrozdja' })
  vrstaGrozdja: VrstaGrozdja;

  @OneToMany(() => Sira, sira => sira.grozdje)
  sire: Sira[];
}