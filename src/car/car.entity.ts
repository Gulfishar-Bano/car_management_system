import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Driver } from "src/driver/driver.entity";
import { CarBrand } from "src/car-brand/car_brand.entity";
import { CarType } from "src/car-type/car-type.entity";
import { Fare } from "src/fare/fare.entity";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Booking } from "src/booking/entities/booking.entity";


@ObjectType()
@Entity()
export class Car {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    carNo: string

    @Field(() => CarBrand, {nullable:true})
    @ManyToOne(() => CarBrand, (brand) => brand.cars)
    brand: CarBrand;


    @Field(() => CarType,{nullable:true})
    @ManyToOne(() => CarType, (type) => type.cars,{nullable:true})
    carType: CarType;


    @Field()
    @Column()
    model: string

    @Field()
    @Column()
    fuelType: string

    @Field()
    @Column()
    noOfSeats: number

    @Field()
    @Column()
    ac: boolean

    @Field({nullable:true})
    @Column({ nullable: true })
    description: string


    @Field(() => Driver,{nullable:true})
    @ManyToOne(() => Driver, driver => driver.cars)
    driver: Driver;

   @Field({nullable:true})
    @Column({ nullable: true })
    imageUrl: string

    @Field(() => [Fare],{nullable:true})
    @OneToMany(() => Fare, (fare) => fare.car)
    fares: Fare[]

    @OneToMany(()=>Booking,booking=>booking.car)
    bookings:Booking[]




}







