import { Entity,PrimaryGeneratedColumn, Column,OneToMany } from "typeorm";
import { Car } from "src/car/car.entity";


@Entity()
export class Driver{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column()
    licence:string

    @Column({type:'date'})
    validity:Date

    @OneToMany(()=>Car ,(car)=>car.driver)
    cars:Car[];


}