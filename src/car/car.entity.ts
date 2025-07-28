import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany} from "typeorm";
import { Driver } from "src/driver/driver.entity";
import { CarBrand } from "src/car-brand/car_brand.entity";
import { CarType } from "src/car-type/car-type.entity";
import { Fare } from "src/fare/fare.entity";


@Entity()
export class Car
{
 @PrimaryGeneratedColumn()
 id:number

 @Column()
 carNo:string

 @ManyToOne(() => CarBrand, (brand) => brand.cars)
brand: CarBrand;

@ManyToOne(() => CarType, (type) => type.cars)
carType: CarType;

 @Column()
 model:string

 @Column()
 fuelType:string

 @Column()
 noOfSeats:number

 @Column()
 ac:boolean

 @Column({nullable:true})
description:string

@ManyToOne(()=>Driver ,driver=>driver.cars)
driver:Driver;

@OneToMany(()=>Fare,(fare)=>fare.car)
fares:Fare[]

 
}

 





 