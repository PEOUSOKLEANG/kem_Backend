import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'chat'})
export class Chat {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    message:string;

    @Column()
    key:string;

    @ManyToOne(()=>User , (user)=>user.sender)
    sender:User;

    @ManyToOne(()=>User , (user)=>user.receiver)
    receiver:User;

    // @OneToMany(()=>Image ,(image)=>image.chat_id)
    // chat_image:Image[];

    


}
