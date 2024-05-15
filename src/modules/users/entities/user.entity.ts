import { share } from "rxjs";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Post } from "src/modules/posts/entities/post.entity";
import { Share } from "src/modules/shares/entities/share.entity";
import {  Column, Entity, OneToMany, PrimaryGeneratedColumn,BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Report } from "src/modules/reports/entities/report.entity";
import { Feedback } from "src/modules/feedbacks/entities/feedback.entity";
import { Otp } from "src/modules/auth/entities/otp.entity";
import { argon2d } from "argon2";
import { Auth } from "src/modules/auth/entities/auth.entity";
import { Chat } from "src/modules/chats/entities/chat.entity";


export enum Gender{
    Male='male',
    Female ='female',
    Other = 'other'

}
export enum Role{
    Admin = 'admin',
    User = 'user',
    Guess= 'guess'
}
@Entity({name:'users'})
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    username:string;

    @Column({type:'enum',enum:Gender, default:Gender.Other})
    gender:string;
    
    @Column({nullable:false})
    phone_number:string;

    //
    @Column({nullable:true,})
    email:string;

    @Column({nullable:false , type:'enum', enum:Role})
    role:string;

    @Column({nullable:false })
    password:string;

    @Column({nullable:true})
    firstname:string;
    @Column({nullable:true})
    lastname:string;

    @Column({type:'date'})
    dob: Date;

    @Column({nullable:true})
    location:string;

    @Column({nullable:true})
    profile_image:string;

    @Column({unique:true})
    private_key:string;

    @Column({type:'date'})
    create_at:Date;

    //share
    @OneToMany(()=> Share, (share)=>share.user)
    share:Share[];

    //post 
    @OneToMany(()=>Post,(post)=>post.user)
    post:Post[];
    

    //report
    @OneToMany(()=>Report, report=>report.user)
    report:Report[];
    //feedback 
    @ManyToOne(()=>Feedback,(feedback)=>feedback.user)
    @JoinColumn({name:'feedback_id'})
    feedback:Feedback;


  

    //Auth
    @OneToOne(()=>Auth ,(auth)=>auth.user)
    @JoinColumn({name:'auth'})
    auth:Auth;
    // @Column({nullable:true})
    // refresh_token:string;


    @OneToMany(()=>Chat,(chat)=>chat.sender)
    sender:Chat[];

    @OneToMany(()=>Chat ,(chat)=>chat.receiver)
    receiver:Chat[]

    //Otp
    // @OneToOne(()=>Otp,(otp)=>otp.user)
    // @JoinColumn({name:'otp'})
    // otp:Otp;


    @BeforeInsert()
    async hashPrivatKey(): Promise<void>{
        this.private_key = await bcrypt.hash(this.private_key,8)
    }

    

    
    

    //before insert 
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
        // this.password =await argon2d.hash(this.password)
    }

  

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }


}
