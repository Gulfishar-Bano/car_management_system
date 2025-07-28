import { Car } from "src/car/car.entity";
import { Markup } from "src/markup/markup.entity";
import { Entity,PrimaryGeneratedColumn,Column, ManyToOne, JoinTable } from "typeorm";


@Entity()
export class Fare{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    FromLocation:string

    @Column()
    ToLocation:string

    @Column()
    currency:string

    @Column('decimal')
    fare:number


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;
    
    @ManyToOne(()=>Car ,car=>car.fares,{onDelete:'CASCADE'})
    car:Car

   
    


}