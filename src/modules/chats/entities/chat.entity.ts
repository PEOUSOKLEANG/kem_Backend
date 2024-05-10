import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'chat'})
export class Chat {
    @PrimaryGeneratedColumn()
    id:number;
}
