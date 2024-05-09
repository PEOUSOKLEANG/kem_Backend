import { Post } from "src/modules/posts/entities/post.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'feedbacks'})
export class Feedback {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    feedback:string;

    @Column({nullable:true})
    image:string;
    //postid
    @ManyToOne(()=>Post,(post)=>post.feedback)
    @JoinColumn({name:'post_id'})
    post:Post;

    // people given feedback
    @ManyToOne(()=>User, (user)=>user.feedback)
    @JoinColumn({name:'user_id'})
    user:User;
    
  
}
