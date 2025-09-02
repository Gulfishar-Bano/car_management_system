import { IsString } from "class-validator";
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "src/car/car.entity";
import { Driver } from "src/driver/driver.entity";
import { Fare } from "src/fare/fare.entity";
import { Entity } from "typeorm";



export enum BookingStatus{
   Pending="Pending",
   Confirmed="Confirmed",
   Cancelled="Cancelled",
   Completed="Completed",
}

@Entity()
export class Booking {

@PrimaryGeneratedColumn()
id:number

@Column()
Name:string

@Column()
Email:string

@Column()
PickUpLocation:string

@Column()
DropLocation:string

@Column()
Date:Date

@Column({type:'enum', enum:BookingStatus,default:BookingStatus.Pending})
Status:BookingStatus


@ManyToOne(()=>Car,car => car.bookings,{eager:true,nullable:true})
car:Car

@ManyToOne(()=>Driver,driver=>driver.bookings,{eager:true,nullable:true})
driver:Driver

@ManyToOne(()=>Fare,fare=>fare.bookings,{eager:true,nullable:true})
fare:Fare

}
