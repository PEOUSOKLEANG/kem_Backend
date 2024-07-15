import { ERole } from "src/common/enum/role.enum";

export class AdminUpdateAccountDto{
    user_id:number;
    username: string;
    firstname: string;
    lastname: string;
    password :string; 
    dob:Date;
    role:ERole;
    email:string;
    phone_number:string;



}