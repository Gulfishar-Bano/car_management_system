import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';


@ObjectType()
@Entity()
export class Markup {
  @Field(()=>Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'enum', enum: ['percentage', 'fixed'] })
  type: 'percentage' | 'fixed';

  @Field()
  @Column('decimal')
  value: number; // Either a percentage or a fixed amount

  @Field(()=>Date)
  @CreateDateColumn()
  createdAt: Date;
}
