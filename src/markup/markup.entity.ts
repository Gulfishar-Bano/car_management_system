import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Markup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['percentage', 'fixed'] })
  type: 'percentage' | 'fixed';

  @Column('decimal')
  value: number; // Either a percentage or a fixed amount

  @CreateDateColumn()
  createdAt: Date;
}
