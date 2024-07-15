import { ERole } from "src/common/enum/role.enum";


export class GivenAccountDto{
    username :string;
    role:ERole;
    phone_number:string;
    password:string;
}