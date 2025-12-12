import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Car } from 'src/car/car.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GraphQLISODateTime } from '@nestjs/graphql';
import { Booking } from 'src/booking/entities/booking.entity';


@ObjectType()
@Entity()
export class Driver {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Column({ default: true }) 
    isActive: boolean;

  @Field()
  @Column()
  licence: string;

  

  @Field(() => GraphQLISODateTime) // Correct GraphQL Type for Date object
@Column({ type: 'date' }) // Use the simple 'date' type
validity: Date;


@Field()
  @Column()
  phone : number;

  @Field(() => [Car], { nullable: true }) // Include related cars if needed
  @OneToMany(() => Car, (car) => car.driver)
  cars: Car[];

  @OneToMany(()=>Booking,booking=>booking.driver)
  bookings:Booking[];
}
