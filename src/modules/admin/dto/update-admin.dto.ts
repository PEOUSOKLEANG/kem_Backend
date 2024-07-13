import { Role } from "src/common/enum/role.enum";

export class AdminUpdateAccountDto{
    user_id:number;
    username: string;
    firstname: string;
    lastname: string;
    password :string; 
    dob:Date;
    role:Role;
    email:string;
    phone_number:string;



}