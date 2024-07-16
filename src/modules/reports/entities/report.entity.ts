import { Report_Status } from "src/common/enum/report_status.enum";
import { Post } from "src/modules/posts/entities/post.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'reports'})
export class Report {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'enum', enum:Report_Status})
    report_status:string;

    @CreateDateColumn({})
    report_date:Date;

    //userid
    @ManyToOne(()=>User,(user)=>user.report)
    @JoinColumn({name:'user_id'})
    user:User;
    //postid
    @ManyToOne(()=>Post,(post)=>post.report)
    @JoinColumn({name:'post_id'})
    post:Post;
}
