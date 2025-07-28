import { Entity,PrimaryGeneratedColumn,Column,OneToMany } from "typeorm";
import { Car } from "src/car/car.entity";

@Entity()

export class CarType{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @OneToMany(()=>Car,(car)=>car.carType)
    cars:Car[]
}