import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
export enum Report_Status{
    Post_Is_Out_Content='post_is_out_content'
}

@Entity({name:'reports'})
export class Report {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'enum'})
    report_status:string;

    //userid
    //postid
}
