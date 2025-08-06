import { Entity,PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";
import { Car } from "src/car/car.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class CarBrand{

    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id:number

    @Field()
    @Column()
    name:string
    
    @Field(()=>[Car],{nullable:true})
    @OneToMany(()=>Car,(car)=>car.brand)
    cars:Car[]


}