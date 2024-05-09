import { Post } from "src/modules/posts/entities/post.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'shares'})
export class Share {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'date'})
    date_shared:Date;
    
    @Column({nullable:true})
    caption:string; 

    //userid people who share post 
    @ManyToOne(()=> User, (user)=>user.share)
    @JoinColumn({name:'user_id'})
    user:User;

    //postid
    @ManyToOne(()=>Post, (post)=>post.share)
    @JoinColumn({name:'post_id'})
    post:Post;


    
}
