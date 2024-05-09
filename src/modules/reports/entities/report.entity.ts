import { Post } from "src/modules/posts/entities/post.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
export enum Report_Status{
    Post_Is_Out_Content='post_is_out_content',
    
    
}

@Entity({name:'reports'})
export class Report {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'enum', enum:Report_Status})
    report_status:string;

    //userid
    @ManyToOne(()=>User,(user)=>user.report)
    @JoinColumn({name:'user_id'})
    user:User;
    //postid
    @ManyToOne(()=>Post,(post)=>post.report)
    @JoinColumn({name:'post_id'})
    post:Post;
}
