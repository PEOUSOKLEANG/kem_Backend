import { share } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Post } from "src/modules/posts/entities/post.entity";
import { Share } from "src/modules/shares/entities/share.entity";
import {  Column, Entity, OneToMany, PrimaryGeneratedColumn,BeforeInsert, BeforeUpdate } from "typeorm";
import * as bcrypt from 'bcrypt';


export enum Gender{
    Male='male',
    Female ='female',
    Other = 'other'

}

@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    username:string;
    @Column({type:'enum',enum:Gender, default:Gender.Other})
    gender:string;
    
    @Column()
    phone_number:string;

    @Column()
    password:string;

    @Column()
    firstname:string;
    @Column()
    lastname:string;

    @Column({type:'date'})
    dob: Date;

    @Column()
    location:string;

    @Column()
    profile_image:string;
    //share
    @OneToMany(()=> Share, (share)=>share.user)
    share:Share[];

    //post 
    @OneToMany(()=>Post,(post)=>post.user)
    post:Post[];

    //before insert 
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

  

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }


}
