import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";


@Entity()
export class CarBrand{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string


}