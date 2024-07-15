import { Feedback } from "src/modules/feedbacks/entities/feedback.entity";
import { Report } from "src/modules/reports/entities/report.entity";
import { Share } from "src/modules/shares/entities/share.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Active{
    TRUE='true',
    FALSE='false'
}
@Entity({name:'post'})
export class Post {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    location:string;

    // new add contact start 
    @Column({nullable:true})
    contact:string; //phone number

    @Column({nullable:true})
    categories:string;

    @Column({nullable:true})
    tele_link:string;

    @Column({nullable:true})
    fb_link:string

        //link make the post look good
    @Column({type:'enum',enum:Active , default:Active.FALSE})
    fb_link_active:boolean;
        //link active boolean 
    @Column({type:'enum',enum:Active , default:Active.FALSE})
    tele_link_active:boolean;


    // new add contact start 

    @Column({nullable:true})
    post_file:string;

    @Column({nullable:true})
    description:string;


    @UpdateDateColumn({nullable:true})
    update_date:Date;

    @Column({ type: 'date', nullable: true, default: () => 'CURRENT_DATE' })
    post_date: Date;
    //share
    @OneToMany(()=> Share,(share)=>share.post)
    share:Share[];

    //user
    @ManyToOne(()=>User,(user)=>user.post)
    @JoinColumn({name:'user_id'})
    user:User;

    //feedback
    @OneToMany(()=>Feedback,(feedback)=>feedback.post)
    feedback:Feedback[];

    //Report
    @OneToMany(()=>Report, (report)=>report.user)
    report:Report[];


    



}
