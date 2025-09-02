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

  @Field()
  @Column()
  licence: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
@Column({ type: 'date', nullable: true })
validity: Date;


  @Field(() => [Car], { nullable: true }) // Include related cars if needed
  @OneToMany(() => Car, (car) => car.driver)
  cars: Car[];

  @OneToMany(()=>Booking,booking=>booking.driver)
  bookings:Booking[];
}
