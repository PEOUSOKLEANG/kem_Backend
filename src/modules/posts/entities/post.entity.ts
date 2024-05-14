import { Feedback } from "src/modules/feedbacks/entities/feedback.entity";
import { Report } from "src/modules/reports/entities/report.entity";
import { Share } from "src/modules/shares/entities/share.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum KeyPost{
    Farmer = 'farmer',
    Invention = 'invention',
    Plantfruit ='plantfruit',
    Gardener = 'gardener'

}

@Entity({name:'post'})
export class Post {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false,type:'enum',enum:KeyPost , default:KeyPost.Farmer})
    key_post:string;


    @Column({ type: 'date', nullable: true, default: () => 'CURRENT_DATE' })
    post_date: Date;

    @Column({nullable:true})
    location:string;

    @Column({nullable:true})
    post_file:string;

    @UpdateDateColumn({nullable:true})
    update_date:Date;

    @Column({nullable:true})
    description:string;

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
