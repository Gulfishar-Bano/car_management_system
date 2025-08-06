import { Car } from "src/car/car.entity";
import { Markup } from "src/markup/markup.entity";
import { Entity,PrimaryGeneratedColumn,Column, ManyToOne, JoinTable } from "typeorm";
import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
@Entity()
export class Fare{

    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id:number

    @Field()
    @Column()
    FromLocation:string

    @Field()
    @Column()
    ToLocation:string

    @Field()
    @Column()
    currency:string

    @Field()
    @Column('decimal')
    fare:number


    @Field(()=>Date)
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;
    
    @Field(()=>Car)
    @ManyToOne(()=>Car ,car=>car.fares,{onDelete:'CASCADE'})
    car:Car

   
    


}