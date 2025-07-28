import { Entity } from "typeorm";
import { PrimaryGeneratedColumn,Column } from "typeorm";


@Entity()
export class User{

@PrimaryGeneratedColumn()
id:number

@Column({unique:true})
email:string


@Column()
password:string



}

