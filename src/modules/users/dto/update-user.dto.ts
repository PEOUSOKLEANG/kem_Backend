import { Role } from "../entities/user.entity";

export class UpdateUserInfo {
    username:string;
    firstname:string;
    lastname:string;
    gender:string;
    email:string;
    phone_number:string;
    dob:Date;
    location:string;
    role:Role;
}