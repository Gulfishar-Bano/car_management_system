import { Entity } from "typeorm";
import { PrimaryGeneratedColumn,Column } from "typeorm";

export enum UserRole{

    ADMIN='admin',
    USER='user'
}

@Entity()
export class User{

@PrimaryGeneratedColumn()
id:number

@Column({unique:true})
email:string


@Column()
password:string

@Column(
    {
      type:'enum',
      enum:UserRole,
      default:UserRole.USER
    }
)role:UserRole



}



