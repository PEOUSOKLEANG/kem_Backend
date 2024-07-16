import { ERole } from "src/common/enum/role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name:'roles'})
export class Role{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true, type:'enum',enum:ERole })
    name:String;

    @OneToMany(() => User, user => user.role)
    users: User[];
}