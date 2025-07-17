import {Entity,PrimaryGeneratedColumn,Column} from "typeorm";

@Entity()
export class Car
{
 @PrimaryGeneratedColumn()
 id:number

 @Column()
 carNo:string

 @Column()
 carTypeId:number

 @Column()
 brandId:number

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
 

}