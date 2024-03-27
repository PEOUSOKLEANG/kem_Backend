import { Feedback } from "src/modules/feedbacks/entities/feedback.entity";
import { Share } from "src/modules/shares/entities/share.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum KeyPost{
    Knowledge='knowledge',
    Farmer = 'farmer',
    Invention = 'invention',
    

}

@Entity({name:'post'})
export class Post {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'enum',enum:KeyPost , default:KeyPost.Knowledge})
    key_post:string;


    @Column({ type: 'date', nullable: true, default: () => 'CURRENT_DATE' })
    post_date: Date;

    @Column()
    location:string;

    @Column()
    post_file:string;

    @UpdateDateColumn()
    update_date:string;

    @Column()
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
    



}
