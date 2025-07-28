import { Entity,PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";
import { Car } from "src/car/car.entity";


@Entity()
export class CarBrand{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string
    
    @OneToMany(()=>Car,(car)=>car.brand)
    cars:Car[]


}