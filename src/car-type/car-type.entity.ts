import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

@Entity()

export class CarType{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string
}