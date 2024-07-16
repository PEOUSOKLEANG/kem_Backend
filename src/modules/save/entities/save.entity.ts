import { Post } from "src/modules/posts/entities/post.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'save'})
export class Save {
    @PrimaryGeneratedColumn()
    id:number; 

    @ManyToOne(()=>Post ,(post)=>post.save)
    @JoinColumn({name:'post_id'})
    post:Post;
    
    @ManyToOne(()=>User ,(user)=>user.save)
    @JoinColumn({name:'user_id'})
    user:User;

    
    @CreateDateColumn()
    create_at: Date; 

}
