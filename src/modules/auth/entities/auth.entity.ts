import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'auth'})
export class Auth{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({nullable:true})
    refresh_token:string;

    @OneToOne(()=>User ,(user)=>user.auth)
    @JoinColumn({name:'user'})
    user:User;
}