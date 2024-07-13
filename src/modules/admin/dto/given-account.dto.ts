import { Role } from "src/common/enum/role.enum";


export class GivenAccountDto{
    username :string;
    role:Role;
    phone_number:string;
    password:string;
}