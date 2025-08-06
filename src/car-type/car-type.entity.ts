import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Car } from 'src/car/car.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() 
@Entity()
export class CarType {
  @Field(() => Int) 
  @PrimaryGeneratedColumn()
  id: number;

  @Field() 
  @Column()
  name: string;

  @Field(() => [Car], { nullable: true })
  @OneToMany(() => Car, (car) => car.carType)
  cars: Car[];
}
