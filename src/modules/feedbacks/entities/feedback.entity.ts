import { Post } from "src/modules/posts/entities/post.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'feedbacks'})
export class Feedback {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    comment:string;

    @Column()
    image:string;
    //postid
    @ManyToOne(()=>Post,(post)=>post.feedback)
    @JoinColumn({name:'post_id'})
    post:Post;
    
    //userid
}
