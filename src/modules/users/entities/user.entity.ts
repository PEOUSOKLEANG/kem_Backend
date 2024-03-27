import { share } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Post } from "src/modules/posts/entities/post.entity";
import { Share } from "src/modules/shares/entities/share.entity";
import {  Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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


}
