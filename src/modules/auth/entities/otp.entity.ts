import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'otp'})
export class Otp{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    otp:string;


    // that can't be email and phone__number
    @Column()
    username:string;

    @Column({ type: 'timestamp', default: () => `CURRENT_TIMESTAMP + INTERVAL '300' SECOND` })
    expirationDate: Date;
  }





    // @OneToOne(()=>User,(user)=>user.otp)
    // @JoinColumn({name:'user'})
    // user:User;

