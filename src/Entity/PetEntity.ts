import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecies from "../Enum/Especies";

@Entity()
export default class PetEntity{
@PrimaryGeneratedColumn()
 id: number; 
 @Column()
 nome: string;
 @Column()
 especie: EnumEspecies;
 @Column()
 dataNasc: Date;
 @Column()
 adotado: boolean;
}